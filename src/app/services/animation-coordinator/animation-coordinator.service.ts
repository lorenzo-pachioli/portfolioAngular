import { Injectable, inject, signal, computed, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Tipos públicos ────────────────────────────────────────────────────────────

/**
 * Estados del semáforo.
 * scrolling tiene prioridad máxima y no puede ser sobreescrito por animating.
 *
 *  idle ──scrollStart──▶ scrolling ──scrollEnd + debounce──▶ idle
 *  idle ──animStart───▶ animating ──animEnd─────────────────▶ idle
 */
export type AnimationState = 'idle' | 'scrolling' | 'animating';

/** Tasa de renderizado asignada por el semáforo a cada consumidor */
export type FrameRate = 'full' | 'half' | 'none';

/** Contrato de permiso que leen los componentes de partículas en cada tick */
export interface RenderPermission {
  readonly canRender: boolean;
  readonly frameRate: FrameRate;
}

/** Callback de tick que registra cada consumidor */
export type TickCallback = () => void;

// ─── Constantes internas ───────────────────────────────────────────────────────

/**
 * Tiempo de espera luego de 'scrollEnd' antes de volver a 'idle'.
 * Evita que las partículas se reactiven antes de que GSAP aplique
 * el último fotograma del scroll.
 */
const SCROLL_END_DEBOUNCE_MS = 180;

// ─────── Instrucciones ──────────────────────────────────────────────────────────
/**
 * AnimationCoordinatorService — Semáforo central de animaciones.
 *
 * Resuelve la condición de carrera entre tres competidores por el frame budget:
 *   • GSAP ScrollTrigger (scrub / scroll-driven)
 *   • BackgroundAnimation (partículas DOM)
 *   • BackgroundAnimationCanvas (partículas canvas)
 *
 * Estrategia:
 *   1. Un único RAF vía gsap.ticker — elimina los tres loops independientes.
 *   2. Los componentes se registran con register(callback).
 *   3. El coordinator invoca los callbacks en cada tick.
 *   4. Cada componente lee particlePermission() para decidir si renderiza.
 *
 * Asignación de frame budget por estado:
 *   idle      → full  (60 fps) — sin competencia
 *   animating → half  (30 fps) — comparte budget con GSAP
 *   scrolling → none  (0 fps)  — cede el 100 % al scroll
 */
@Injectable({ providedIn: 'root' })
export class AnimationCoordinatorService {

  private readonly ngZone = inject(NgZone);

  // ─── Estado reactivo ─────────────────────────────────────────────────────────

  private readonly _state = signal<AnimationState>('idle');

  /** Estado actual del semáforo (solo lectura para consumidores) */
  readonly state = this._state.asReadonly();

  // ─── Permisos computados ─────────────────────────────────────────────────────

  readonly particlePermission = computed<RenderPermission>(() => {
    switch (this._state()) {
      case 'scrolling':
        return { canRender: false, frameRate: 'none' };
      case 'animating':
        return { canRender: true, frameRate: 'half' };
      case 'idle':
      default:
        return { canRender: true, frameRate: 'full' };
    }
  });

  // ─── Contador de ticks ────────────────────────────────────────────────────────

  /**
   * Se incrementa en cada tick de gsap.ticker.
   * Los consumidores en modo 'half' lo usan para el frame skip.
   */
  private _tickCount = 0;
  get tickCount(): number { return this._tickCount; }

  // ─── Internos ─────────────────────────────────────────────────────────────────

  private scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly consumers = new Set<TickCallback>();
  private readonly gsapTickerFn: () => void;

  // ─── Bootstrap ───────────────────────────────────────────────────────────────

  constructor() {
    // Captura la referencia para poder removerla en cleanup
    this.gsapTickerFn = () => this.onTick();

    this.ngZone.runOutsideAngular(() => {
      // Único RAF de toda la aplicación
      gsap.ticker.add(this.gsapTickerFn);

      // Integración con ScrollTrigger para las transiciones de estado
      ScrollTrigger.addEventListener('scrollStart', () => this.transitionToScrolling());
      ScrollTrigger.addEventListener('scrollEnd', () => this.scheduleReturnToIdle());
    });
  }

  // ─── Transiciones ─────────────────────────────────────────────────────────────

  private transitionToScrolling(): void {
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = null;
    }
    this._state.set('scrolling');
  }

  private scheduleReturnToIdle(): void {
    this.scrollEndTimer = setTimeout(() => {
      this._state.set('idle');
      this.scrollEndTimer = null;
    }, SCROLL_END_DEBOUNCE_MS);
  }

  // ─── API pública para GsapAnimationsService ───────────────────────────────────

  /**
   * Llamar al iniciar una animación GSAP no scroll-driven.
   * Solo transiciona si el semáforo no está en 'scrolling' (el scroll tiene prioridad).
   */
  notifyAnimationStart(): void {
    if (this._state() !== 'scrolling') {
      this._state.set('animating');
    }
  }

  /** Llamar al completar una animación GSAP. Devuelve el semáforo a 'idle'. */
  notifyAnimationEnd(): void {
    if (this._state() === 'animating') {
      this._state.set('idle');
    }
  }

  // ─── Registro de consumidores ─────────────────────────────────────────────────
  register(callback: TickCallback): () => void {
    this.consumers.add(callback);
    return () => this.consumers.delete(callback);
  }

  // ─── Tick interno ─────────────────────────────────────────────────────────────
  private onTick(): void {
    this._tickCount++;
    for (const cb of this.consumers) {
      cb();
    }
  }
}
