import { Injectable, inject, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationCoordinatorService } from '../animation-coordinator/animation-coordinator.service';

gsap.registerPlugin(ScrollTrigger);

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface FadeConfig {
  delay?: number;
  distance?: number;
  once?: boolean;
}

interface StaggerConfig {
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  once?: boolean;
}

interface ParallaxConfig {
  speed?: number;
  start?: string;
  end?: string;
}

@Injectable({ providedIn: 'root' })
export class GsapAnimationsService {

  private readonly ngZone = inject(NgZone);
  private readonly coordinator = inject(AnimationCoordinatorService);

  /** Mapa de instancias ScrollTrigger por elemento para cleanup granular */
  private readonly triggerRefs = new Map<Element, ScrollTrigger[]>();

  // ─── Animaciones de entrada ─────────────────────────────────────────────────

  fadeInUp(element: Element, config: FadeConfig = {}): void {
    const { delay = 0, distance = 100, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        y: distance, opacity: 0,
        duration: 1, delay,
        ease: 'power3.out',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  fadeInLeft(element: Element, config: FadeConfig = {}): void {
    const { delay = 0, distance = 100, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        x: -distance, opacity: 0,
        duration: 1.5, delay,
        ease: 'power3.out',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  fadeInRight(element: Element, config: FadeConfig = {}): void {
    const { delay = 0, distance = 100, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        x: distance, opacity: 0,
        duration: 1.5, delay,
        ease: 'power3.out',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  scaleIn(element: Element, config: FadeConfig & { initialScale?: number } = {}): void {
    const { delay = 0, initialScale = 0.5, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        scale: initialScale, opacity: 0,
        duration: 1, delay,
        ease: 'back.out(1.7)',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  rotateIn(element: Element, config: FadeConfig & { rotation?: number } = {}): void {
    const { delay = 0, rotation = 360, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        rotation, opacity: 0,
        duration: 1.2, delay,
        ease: 'power2.out',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  textReveal(element: Element, config: FadeConfig = {}): void {
    const { delay = 0, once = true } = config;

    this.ngZone.runOutsideAngular(() => {
      gsap.from(element, {
        y: 100, opacity: 0,
        duration: 1, delay,
        ease: 'power4.out',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        scrollTrigger: this.buildScrollTrigger(element, { once })
      });
    });
  }

  staggerFadeIn(elements: Element[], config: StaggerConfig = {}): void {
    if (!elements.length) return;
    const { delay = 0.1, direction = 'up', once = true } = config;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.8,
      stagger: delay,
      ease: 'power3.out',
      onStart: () => this.coordinator.notifyAnimationStart(),
      onComplete: () => this.coordinator.notifyAnimationEnd(),
      scrollTrigger: this.buildScrollTrigger(elements[0], { once })
    };

    if (direction === 'up') fromVars['y'] = 50;
    else if (direction === 'left') fromVars['x'] = -50;
    else fromVars['x'] = 50;

    this.ngZone.runOutsideAngular(() => { gsap.from(elements, fromVars); });
  }

  // ─── Animaciones scroll-driven ──────────────────────────────────────────────

  /**
   * Efecto parallax.
   * scrub: 2 en lugar de true → GSAP suaviza los updates intermedios,
   * reduciendo la frecuencia de cálculos durante el scroll.
   */
  parallaxEffect(element: Element, config: ParallaxConfig = {}): void {
    const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = config;

    this.ngZone.runOutsideAngular(() => {
      const tween = gsap.to(element, {
        y: () => ScrollTrigger.maxScroll(window) * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start, end,
          scrub: 2, // numérico en lugar de true: suaviza el lag
          invalidateOnRefresh: true
        }
      });

      const st = tween.scrollTrigger;
      if (st) this.saveTriggerRef(element, st);
    });
  }

  /**
   * Barra de progreso vinculada al scroll.
   * scrub: 1 — mantiene la suavidad sin exagerar los recálculos.
   */
  progressBar(element: Element, targetElement?: Element): void {
    this.ngZone.runOutsideAngular(() => {
      const tween = gsap.from(element, {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: targetElement ?? element,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      });

      const st = tween.scrollTrigger;
      if (st) this.saveTriggerRef(element, st);
    });
  }

  animateNumber(element: Element, targetNumber: number, duration = 2): void {
    this.ngZone.runOutsideAngular(() => {
      const counter = { value: 0 };
      gsap.to(counter, {
        value: targetNumber, duration,
        ease: 'power1.inOut',
        onStart: () => this.coordinator.notifyAnimationStart(),
        onComplete: () => this.coordinator.notifyAnimationEnd(),
        onUpdate: () => { element.textContent = String(Math.round(counter.value)); },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });
    });
  }

  pinElement(element: Element, duration = '+=500'): void {
    this.ngZone.runOutsideAngular(() => {
      const st = ScrollTrigger.create({
        trigger: element,
        pin: true,
        start: 'center center',
        end: duration,
        pinSpacing: true
      });
      this.saveTriggerRef(element, st);
    });
  }

  // ─── Interacciones ──────────────────────────────────────────────────────────

  hover3D(element: HTMLElement, rotationIntensity = 15): () => void {
    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * rotationIntensity;
      const rotateY = ((rect.width / 2 - (e.clientX - rect.left)) / (rect.width / 2)) * rotationIntensity;

      gsap.to(element, {
        duration: 0.5, rotateX, rotateY,
        transformPerspective: 1000, ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, { duration: 0.5, rotateX: 0, rotateY: 0, ease: 'power2.out' });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }

  // ─── Timeline ───────────────────────────────────────────────────────────────

  createTimeline(config?: gsap.TimelineVars): gsap.core.Timeline {
    return gsap.timeline(config);
  }

  // ─── Cleanup ────────────────────────────────────────────────────────────────

  /** Mata los ScrollTriggers de un elemento específico (llamar en ngOnDestroy del componente) */
  killTriggersForElement(element: Element): void {
    this.triggerRefs.get(element)?.forEach(t => t.kill());
    this.triggerRefs.delete(element);
  }

  /** Kill global — usar solo al destruir la app o en situaciones de emergencia */
  killAllScrollTriggers(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.triggerRefs.clear();
  }

  refreshScrollTrigger(): void {
    ScrollTrigger.refresh();
  }

  // ─── Helpers privados ───────────────────────────────────────────────────────

  /**
   * Construye la config base de ScrollTrigger compartida por las animaciones de entrada.
   * once: true por defecto — evita re-disparar la animación en cada scroll.
   */
  private buildScrollTrigger(
    element: Element,
    options: { start?: string; once?: boolean } = {}
  ): ScrollTrigger.Vars {
    const { start = 'top 80%', once = true } = options;
    return {
      trigger: element,
      start,
      toggleActions: once ? 'play none none none' : 'play none none reverse',
      once
    };
  }

  private saveTriggerRef(element: Element, trigger: ScrollTrigger): void {
    const existing = this.triggerRefs.get(element) ?? [];
    this.triggerRefs.set(element, [...existing, trigger]);
  }
}
