import {
  Component, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, Renderer2,
  ChangeDetectionStrategy, inject, NgZone
} from '@angular/core';
import { AnimationCoordinatorService } from 'src/app/services/animation-coordinator/animation-coordinator.service';

// ─── Tipos ─────────────────────────────────────────────────────────────────────

/**
 * Coordenadas en píxeles (no en porcentaje).
 * El cambio de % a px es fundamental: permite usar translate3d
 * en lugar de left/top, eliminando las operaciones de reflow.
 */
interface DustParticle {
  readonly element: HTMLDivElement;
  x: number;          // posición actual en px
  y: number;
  vx: number;         // velocidad en px/frame
  vy: number;
  baseX: number;      // posición base para la atracción de retorno
  baseY: number;
}

// ─── Constantes ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 300;

/** Radio de influencia del mouse al cuadrado — evita Math.sqrt preventivo */
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

/** Velocidad máxima de retorno a la posición base por frame */
const BASE_RETURN_FACTOR = 0.001;

@Component({
  selector: 'app-background-animation',
  standalone: true,
  templateUrl: './background-animation.html',
  styleUrls: ['./background-animation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundAnimation implements AfterViewInit, OnDestroy {

  @ViewChild('particlesContainer', { static: true })
  private readonly particlesContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('gradientWrapper', { static: true })
  private readonly gradientWrapper!: ElementRef<HTMLDivElement>;

  // ─── DI vía inject() ────────────────────────────────────────────────────────

  private readonly renderer = inject(Renderer2);
  private readonly ngZone = inject(NgZone);
  private readonly coordinator = inject(AnimationCoordinatorService);

  // ─── Estado interno ──────────────────────────────────────────────────────────

  private readonly dustParticles: DustParticle[] = [];

  private mouseX = 0;
  private mouseY = 0;
  private mouseActive = false;
  private mouseTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Dimensiones cacheadas para evitar lecturas de layout en cada frame */
  private viewportW = 0;
  private viewportH = 0;

  // ─── Cleanup refs ────────────────────────────────────────────────────────────

  private unregisterTick!: () => void;
  private cleanupMouse!: () => void;
  private cleanupResize!: () => void;

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.cacheViewport();
    this.initParticles();
    this.moveGradientToBody();

    this.ngZone.runOutsideAngular(() => {
      // Se subscribe al tick coordinado: sin RAF propio
      this.unregisterTick = this.coordinator.register(() => this.onTick());

      // Mouse: clearTimeout antes de crear uno nuevo → un timer a la vez
      const mouseHandler = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.mouseActive = true;

        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => {
          this.mouseActive = false;
          this.mouseTimeout = null;
        }, 150);
      };
      document.addEventListener('mousemove', mouseHandler);
      this.cleanupMouse = () => document.removeEventListener('mousemove', mouseHandler);

      const resizeHandler = () => this.cacheViewport();
      window.addEventListener('resize', resizeHandler);
      this.cleanupResize = () => window.removeEventListener('resize', resizeHandler);
    });
  }

  ngOnDestroy(): void {
    this.unregisterTick?.();
    this.cleanupMouse?.();
    this.cleanupResize?.();
    if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
  }

  // ─── Inicialización ───────────────────────────────────────────────────────────

  /**
   * Crea todas las partículas en un DocumentFragment y las inserta
   * en un único appendChild.
   */
  private initParticles(): void {
    const fragment = document.createDocumentFragment();
    const w = this.viewportW;
    const h = this.viewportH;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = this.renderer.createElement('div') as HTMLDivElement;
      el.className = 'particle dust';

      const size = Math.random() * 2 + 0.5;
      const x = Math.random() * w;
      const y = Math.random() * h;

      // cssText: un solo string assignment
      el.style.cssText = `
        width:${size}px;
        height:${size}px;
        opacity:${Math.random() * 0.4 + 0.1};
        transform:translate3d(${x}px,${y}px,0);
      `;

      fragment.appendChild(el);

      this.dustParticles.push({
        element: el,
        x, y,
        // Velocidad en px/frame 
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseX: x,
        baseY: y
      });
    }

    // Un único insert al DOM
    this.particlesContainer.nativeElement.appendChild(fragment);
  }

  private cacheViewport(): void {
    this.viewportW = window.innerWidth;
    this.viewportH = window.innerHeight;
  }

  /**
   * Mueve el gradient wrapper al body para asegurar el correcto
   * apilamiento visual (z-index) independientemente del stacking context del componente.
   */
  private moveGradientToBody(): void {
    if (this.gradientWrapper) {
      document.body.insertBefore(
        this.gradientWrapper.nativeElement,
        document.body.firstChild
      );
    }
  }

  // ─── Tick coordinado ──────────────────────────────────────────────────────────

  /**
   * Llamado por el coordinator en cada tick de gsap.ticker.
   * Implementa el protocolo del semáforo:
   *   none → no renderiza
   *   half → renderiza en frames pares (30 fps efectivos)
   *   full → renderiza siempre (60 fps)
   */
  private onTick(): void {
    const { canRender, frameRate } = this.coordinator.particlePermission();

    if (!canRender) return;

    if (frameRate === 'half' && this.coordinator.tickCount % 2 !== 0) return;

    this.renderParticles();
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  private renderParticles(): void {
    const { mouseActive, mouseX, mouseY } = this;

    for (const dust of this.dustParticles) {
      this.updateParticle(dust, mouseActive, mouseX, mouseY);
    }
  }

  /**
   * Actualiza posición de una partícula y escribe el transform.
   *
   * La escritura de transform es compositor-only: no invalida el layout,
   * no dispara paint. El navegador delega el movimiento a la GPU.
   */
  private updateParticle(
    dust: DustParticle,
    mouseActive: boolean,
    mouseX: number,
    mouseY: number
  ): void {
    dust.x += dust.vx;
    dust.y += dust.vy;

    if (mouseActive) {
      const dx = mouseX - dust.x;
      const dy = mouseY - dust.y;
      const distSq = dx * dx + dy * dy;

      // Math.sqrt solo cuando la partícula está dentro del radio
      if (distSq < MOUSE_RADIUS_SQ) {
        const dist = Math.sqrt(distSq);
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / MOUSE_RADIUS) * 0.9;

        dust.x -= Math.cos(angle) * force;
        dust.y -= Math.sin(angle) * force;
      }
    }

    // Retorno suave a la posición base impulsada por el viento
    dust.baseX += dust.vx;
    dust.baseY += dust.vy;
    dust.x += (dust.baseX - dust.x) * BASE_RETURN_FACTOR;
    dust.y += (dust.baseY - dust.y) * BASE_RETURN_FACTOR;

    // World wrapping: 5% de margen fuera de pantalla
    const mx = this.viewportW * 0.05;
    const my = this.viewportH * 0.05;

    if (dust.x < -mx) { dust.x = this.viewportW + mx; dust.baseX = dust.x; }
    else if (dust.x > this.viewportW + mx) { dust.x = -mx; dust.baseX = dust.x; }

    if (dust.y < -my) { dust.y = this.viewportH + my; dust.baseY = dust.y; }
    else if (dust.y > this.viewportH + my) { dust.y = -my; dust.baseY = dust.y; }

    // ← LA ÚNICA ESCRITURA: translate3d → compositor, sin reflow
    dust.element.style.transform = `translate3d(${dust.x}px,${dust.y}px,0)`;
  }
}
