import {
  Component, OnDestroy, AfterViewInit,
  ViewChild, ElementRef,
  ChangeDetectionStrategy, inject, NgZone
} from '@angular/core';
import { AnimationCoordinatorService } from 'src/app/services/animation-coordinator/animation-coordinator.service';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Particle3D {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  baseX: number; baseY: number;
  size: number;
  opacity: number;
  /**
   * hasShadow determina si esta partícula dibuja un segundo arc.
   * Se asigna una sola vez en el init basado en SHADOW_PARTICLE_RATIO.
   * Sin hasShadow, shadowDx/shadowDy serían campos sin usar en partículas
   * no-shadow, lo que generaría confusión. El boolean hace la intención explícita.
   */
  hasShadow: boolean;
  shadowDx: number;
  shadowDy: number;
}

// ─── Constantes de configuración ─────────────────────────────────────────────
/**
 * 500 partículas físicas → 1000 puntos visuales.
 * El costo de render sube linealmente solo en las llamadas a ctx.arc():
 * 2 por partícula en lugar de 1. La física (posición, velocidad, z-depth)
 * sigue corriendo solo para las 500 partículas originales.
 */
const PARTICLE_COUNT = 500;
const FOCAL_LENGTH   = 400;
const MAX_Z          = 600;
const MOUSE_RADIUS   = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

/**
 * El shadow se dibuja con este factor de opacidad respecto al original.
 * 0.75 crea una sutil diferencia de "profundidad" percibida entre el
 * punto principal y su duplicado, haciendo que se vean como partículas
 * independientes en lugar de copias evidentes.
 */
const SHADOW_OPACITY_FACTOR = 0.75;

/**
 * El shadow se dibuja levemente más pequeño que el original.
 * Refuerza la ilusión de distancia/profundidad entre los dos puntos.
 */
const SHADOW_SIZE_FACTOR = 0.85;

/**
 * Offset mínimo del shadow como fracción del viewport.
 * Garantiza que el shadow quede siempre a ≥ 30% de distancia del original,
 * distribuyendo los 1000 puntos visuales en todo el espacio disponible
 * sin clustering visible entre pares.
 */
const SHADOW_MIN_OFFSET_RATIO = 0.3;

/**
 * Fracción de partículas que reciben una sombra visual (0.0 → 1.0).
 *
 * Controla el balance entre densidad visual y costo de render:
 *   0.0 → 500 puntos  (solo partículas originales, mínimo costo)
 *   0.5 → 750 puntos  (mitad con sombra)
 *   1.0 → 1000 puntos (todas con sombra, máxima densidad)
 *
 * La asignación es aleatoria por partícula (Math.random() < ratio),
 * no secuencial, para que las sombras queden distribuidas uniformemente
 * en toda la nube independientemente del valor elegido.
 *
 * Valor recomendado: 0.7 (850 puntos visuales, costo ~35% extra en arc calls).
 */
const SHADOW_PARTICLE_RATIO = 0.7;


// ─────────────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-background-animation-canvas',
  standalone: true,
  templateUrl: './background-animation-canvas.html',
  styleUrls: ['./background-animation-canvas.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundAnimationCanvas implements AfterViewInit, OnDestroy {

  @ViewChild('particleCanvas', { static: true })
  private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone      = inject(NgZone);
  private readonly coordinator = inject(AnimationCoordinatorService);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle3D[] = [];
  private particleColor = '#FF4081';

  private mouseX      = 0;
  private mouseY      = 0;
  private mouseActive = false;
  private mouseTimeout: ReturnType<typeof setTimeout> | null = null;

  private unregisterTick!: () => void;
  private cleanupMouse!:   () => void;
  private cleanupResize!:  () => void;

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;

    const computedStyle = getComputedStyle(document.documentElement);
    this.particleColor  = computedStyle.getPropertyValue('--color5').trim() || '#FF4081';

    this.resizeCanvas();
    this.initParticles();

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

      const onResize = (): void => this.resizeCanvas();

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
    const { width, height } = this.canvasRef.nativeElement;

    this.particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const x         = (Math.random() - 0.5) * 2000;
      const y         = (Math.random() - 0.5) * 2000;

      /**
       * La decisión de si esta partícula tiene shadow se toma una sola vez
       * con Math.random(). Con SHADOW_PARTICLE_RATIO = 0.7, el 70% de las
       * partículas recibirán hasShadow = true en promedio.
       * La distribución aleatoria garantiza cobertura uniforme de la nube.
       */
      const hasShadow = Math.random() < SHADOW_PARTICLE_RATIO;
      const { shadowDx, shadowDy } = hasShadow
        ? this.buildShadowOffset(width, height)
        : { shadowDx: 0, shadowDy: 0 };

      return {
        x, y,
        z:       Math.random() * MAX_Z,
        vx:      (Math.random() - 0.5) * 0.4,
        vy:      (Math.random() - 0.5) * 0.4,
        vz:      (Math.random() - 0.1) * 0.3,
        baseX:   x,
        baseY:   y,
        size:    Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        hasShadow,
        shadowDx,
        shadowDy
      };
    });
  }

  private buildShadowOffset(
    viewportW: number,
    viewportH: number
  ): { shadowDx: number; shadowDy: number } {
    const minX   = viewportW * SHADOW_MIN_OFFSET_RATIO;
    const minY   = viewportH * SHADOW_MIN_OFFSET_RATIO;
    const rangeX = viewportW * (1 - SHADOW_MIN_OFFSET_RATIO);
    const rangeY = viewportH * (1 - SHADOW_MIN_OFFSET_RATIO);

    const absDx = minX + Math.random() * rangeX;
    const absDy = minY + Math.random() * rangeY;

    return {
      shadowDx: Math.random() < 0.5 ? absDx : -absDx,
      shadowDy: Math.random() < 0.5 ? absDy : -absDy
    };
  }

  private resizeCanvas(): void {
    const canvas  = this.canvasRef.nativeElement;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ─── Tick coordinado ────────────────────────────────────────────────────────

  private onTick(): void {
    const { canRender, frameRate } = this.coordinator.particlePermission();
    if (!canRender) return;
    if (frameRate === 'half' && this.coordinator.tickCount % 2 !== 0) return;
    this.renderFrame();
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  private renderFrame(): void {
    const canvas         = this.canvasRef.nativeElement;
    const { width, height } = canvas;
    const centerX        = width  / 2;
    const centerY        = height / 2;
    const { mouseActive, mouseX, mouseY } = this;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = this.particleColor;

    for (const particle of this.particles) {
      this.updateAndDrawParticle(
        particle,
        width, height,
        centerX, centerY,
        mouseActive, mouseX, mouseY
      );
    }
  }

  private updateAndDrawParticle(
    p: Particle3D,
    width: number, height: number,
    centerX: number, centerY: number,
    mouseActive: boolean, mouseX: number, mouseY: number
  ): void {

    // ── Física ───────────────────────────────────────────────────────────────

    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
    const px    = centerX + p.x * scale;
    const py    = centerY + p.y * scale;

    if (mouseActive && p.z >= 0 && p.z <= 300) {
      const dx     = mouseX - px;
      const dy     = mouseY - py;
      const distSq = dx * dx + dy * dy;

      if (distSq < MOUSE_RADIUS_SQ) {
        const dist  = Math.sqrt(distSq);
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / MOUSE_RADIUS) * 0.9 * 20;
        p.x -= (Math.cos(angle) * force) / scale;
        p.y -= (Math.sin(angle) * force) / scale;
      }
    }

    p.baseX += p.vx;
    p.baseY += p.vy;
    p.x     += (p.baseX - p.x) * 0.001;
    p.y     += (p.baseY - p.y) * 0.001;

    if      (p.z < 0)    p.z = MAX_Z;
    else if (p.z > MAX_Z) p.z = 0;

    if      (p.baseX < -1500) p.baseX =  1500;
    else if (p.baseX >  1500) p.baseX = -1500;
    if      (p.baseY < -1500) p.baseY =  1500;
    else if (p.baseY >  1500) p.baseY = -1500;

    // ── Arc principal ─────────────────────────────────────────────────────────

    const alpha  = Math.max(0, Math.min(1, p.opacity * scale));
    const radius = Math.max(0.1, p.size * scale);

    this.ctx.globalAlpha = alpha;
    this.ctx.beginPath();
    this.ctx.arc(px, py, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // ── Arc shadow (solo si la partícula fue asignada con shadow en el init) ──

    if (!p.hasShadow) return;

    const sx = px + p.shadowDx;
    const sy = py + p.shadowDy;

    if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) return;

    this.ctx.globalAlpha = Math.max(0, alpha * SHADOW_OPACITY_FACTOR);
    this.ctx.beginPath();
    this.ctx.arc(sx, sy, Math.max(0.1, radius * SHADOW_SIZE_FACTOR), 0, Math.PI * 2);
    this.ctx.fill();
  }
}
