import {
  Component, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, Renderer2,
  ChangeDetectionStrategy, inject, NgZone
} from '@angular/core';
import { AnimationCoordinatorService } from 'src/app/services/animation-coordinator/animation-coordinator.service';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface DustParticle {
  readonly element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

// ─── Constantes de configuración ─────────────────────────────────────────────
/**
 * 300 partículas físicas que se renderizan visualmente como 600
 * usando box-shadow con offset pre-calculado por partícula.
 * El shadow viaja en la misma capa GPU que el translate3d: costo
 * de frame = cero. El costo único es asignar el cssText en el init.
 */
const PARTICLE_COUNT = 300;
const MOUSE_RADIUS    = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const BASE_RETURN     = 0.001;


/**
 * Fracción de partículas DOM que reciben un box-shadow (0.0 → 1.0).
 *
 * A diferencia del canvas (donde el shadow es un segundo arc en el render loop),
 * el shadow DOM es CSS puro asignado una vez en el init. No tiene costo
 * por frame: el compositor GPU lo mueve junto con el translate3d.
 *
 * Por eso el impacto de este ratio en DOM es solo en memoria de VRAM
 * (capas GPU adicionales) y en el tiempo de pintura inicial, no en CPU/frame.
 *
 *   0.0 → 300 puntos  (sin shadows)
 *   0.5 → 450 puntos  (mitad con shadow)
 *   1.0 → 600 puntos  (todas con shadow, máxima densidad)
 *
 * Valor recomendado: 0.8 (540 puntos visuales).
 */
const SHADOW_PARTICLE_RATIO   = 0.8;
const SHADOW_MIN_OFFSET_RATIO = 0.3;

// ─────────────────────────────────────────────────────────────────────────────
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

  private readonly renderer    = inject(Renderer2);
  private readonly ngZone      = inject(NgZone);
  private readonly coordinator = inject(AnimationCoordinatorService);

  private readonly dustParticles: DustParticle[] = [];

  private mouseX      = 0;
  private mouseY      = 0;
  private mouseActive = false;
  private mouseTimeout: ReturnType<typeof setTimeout> | null = null;

  private viewportW = 0;
  private viewportH = 0;

  private unregisterTick!: () => void;
  private cleanupMouse!:   () => void;
  private cleanupResize!:  () => void;

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.cacheViewport();
    this.initParticles();
    this.moveGradientToBody();

    this.ngZone.runOutsideAngular(() => {
      this.unregisterTick = this.coordinator.register(() => this.onTick());

      const onMouseMove = (e: MouseEvent): void => {
        this.mouseX      = e.clientX;
        this.mouseY      = e.clientY;
        this.mouseActive = true;

        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => {
          this.mouseActive  = false;
          this.mouseTimeout = null;
        }, 150);
      };

      const onResize = (): void => this.cacheViewport();

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      this.cleanupMouse  = () => document.removeEventListener('mousemove', onMouseMove);
      this.cleanupResize = () => window.removeEventListener('resize', onResize);
    });
  }

  ngOnDestroy(): void {
    this.unregisterTick?.();
    this.cleanupMouse?.();
    this.cleanupResize?.();
    if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  private initParticles(): void {
    const fragment = document.createDocumentFragment();
    const w        = this.viewportW;
    const h        = this.viewportH;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el      = this.renderer.createElement('div') as HTMLDivElement;
      el.className  = 'particle dust';

      const size    = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.4 + 0.1;
      const x       = Math.random() * w;
      const y       = Math.random() * h;

      /**
       * La decisión de agregar shadow se toma con Math.random() por partícula.
       * Para DOM, el shadow es un box-shadow CSS asignado aquí una sola vez:
       * no existe lógica de shadow en el render loop. El costo por frame es cero.
       *
       * Si la partícula no tiene shadow, se omite la propiedad box-shadow del
       * cssText completamente: ningún string vacío ni valor 'none' innecesario.
       */
      const hasShadow     = Math.random() < SHADOW_PARTICLE_RATIO;
      const shadowCss     = hasShadow ? this.buildShadowCss(w, h, opacity) : '';

      el.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `opacity:${opacity}`,
        `transform:translate3d(${x}px,${y}px,0)`,
        shadowCss
      ].filter(Boolean).join(';');

      fragment.appendChild(el);

      this.dustParticles.push({
        element: el,
        x, y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseX: x,
        baseY: y
      });
    }

    this.particlesContainer.nativeElement.appendChild(fragment);
  }

  /**
   * Genera el string CSS del box-shadow para las partículas que lo reciben.
   *
   * Separado de initParticles() por Single Responsibility:
   * la lógica de construcción del offset es independiente de la creación del DOM.
   *
   * La opacidad del shadow es ligeramente diferente al original (factor 0.6–0.9)
   * para crear una sutil ilusión de profundidad entre los dos puntos.
   */
  private buildShadowCss(w: number, h: number, baseOpacity: number): string {
    const minX          = w * SHADOW_MIN_OFFSET_RATIO;
    const minY          = h * SHADOW_MIN_OFFSET_RATIO;
    const absDx         = minX + Math.random() * (w * (1 - SHADOW_MIN_OFFSET_RATIO));
    const absDy         = minY + Math.random() * (h * (1 - SHADOW_MIN_OFFSET_RATIO));
    const shadowX       = Math.random() < 0.5 ? absDx : -absDx;
    const shadowY       = Math.random() < 0.5 ? absDy : -absDy;
    const shadowOpacity = +(baseOpacity * (0.6 + Math.random() * 0.3)).toFixed(3);

    return `box-shadow:${shadowX}px ${shadowY}px 0 0 rgba(var(--particle-rgb),${shadowOpacity})`;
  }

  private cacheViewport(): void {
    this.viewportW = window.innerWidth;
    this.viewportH = window.innerHeight;
  }

  private moveGradientToBody(): void {
    if (this.gradientWrapper) {
      document.body.insertBefore(
        this.gradientWrapper.nativeElement,
        document.body.firstChild
      );
    }
  }

  // ─── Tick coordinado ────────────────────────────────────────────────────────

  private onTick(): void {
    const { canRender, frameRate } = this.coordinator.particlePermission();
    if (!canRender) return;
    if (frameRate === 'half' && this.coordinator.tickCount % 2 !== 0) return;
    this.renderParticles();
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  private renderParticles(): void {
    const { mouseActive, mouseX, mouseY } = this;
    for (const dust of this.dustParticles) {
      this.updateParticle(dust, mouseActive, mouseX, mouseY);
    }
  }

  private updateParticle(
    dust: DustParticle,
    mouseActive: boolean,
    mouseX: number,
    mouseY: number
  ): void {
    dust.x += dust.vx;
    dust.y += dust.vy;

    if (mouseActive) {
      const dx     = mouseX - dust.x;
      const dy     = mouseY - dust.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < MOUSE_RADIUS_SQ) {
        const dist  = Math.sqrt(distSq);
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / MOUSE_RADIUS) * 0.9;
        dust.x -= Math.cos(angle) * force;
        dust.y -= Math.sin(angle) * force;
      }
    }

    dust.baseX += dust.vx;
    dust.baseY += dust.vy;
    dust.x     += (dust.baseX - dust.x) * BASE_RETURN;
    dust.y     += (dust.baseY - dust.y) * BASE_RETURN;

    const mx = this.viewportW * 0.05;
    const my = this.viewportH * 0.05;

    if      (dust.x < -mx)                { dust.x = this.viewportW + mx; dust.baseX = dust.x; }
    else if (dust.x > this.viewportW + mx) { dust.x = -mx;                dust.baseX = dust.x; }
    if      (dust.y < -my)                { dust.y = this.viewportH + my; dust.baseY = dust.y; }
    else if (dust.y > this.viewportH + my) { dust.y = -my;                dust.baseY = dust.y; }

    dust.element.style.transform = `translate3d(${dust.x}px,${dust.y}px,0)`;
  }
}
