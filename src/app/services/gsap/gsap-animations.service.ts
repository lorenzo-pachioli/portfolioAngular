import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class GsapAnimationsService {

  constructor() { }

  /**
   * @param element Elemento o selector CSS
   * @param delay Retraso en segundos
   * @param distance Distancia del movimiento en pixels
   */
  fadeInUp(element: any, delay: number = 0, distance: number = 100) {
    gsap.from(element, {
      y: distance,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        once: false
      }
    });
  }

  fadeInLeft(element: any, delay: number = 0, distance: number = 100) {
    gsap.from(element, {
      x: -distance,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  fadeInRight(element: any, delay: number = 0, distance: number = 100) {
    gsap.from(element, {
      x: distance,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  scaleIn(element: any, delay: number = 0, initialScale: number = 0.5) {
    gsap.from(element, {
      scale: initialScale,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  rotateIn(element: any, delay: number = 0, rotation: number = 360) {
    gsap.from(element, {
      rotation: rotation,
      opacity: 0,
      duration: 1.2,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  staggerFadeIn(elements: any, staggerDelay: number = 0.1, direction: 'up' | 'left' | 'right' = 'up') {
    const config: any = {
      opacity: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    };

    switch (direction) {
      case 'up':
        config.y = 50;
        break;
      case 'left':
        config.x = -50;
        break;
      case 'right':
        config.x = 50;
        break;
    }

    gsap.from(elements, config);
  }

  textReveal(element: any, delay: number = 0) {
    gsap.from(element, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  parallaxEffect(element: any, speed: number = 0.5) {
    gsap.to(element, {
      y: () => ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }

  pinElement(element: any, duration: string = '+=500') {
    ScrollTrigger.create({
      trigger: element,
      pin: true,
      start: 'center center',
      end: duration,
      pinSpacing: true
    });
  }

  progressBar(element: any, targetElement?: any) {
    gsap.from(element, {
      scaleX: 0,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: targetElement || element,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });
  }

  animateNumber(element: any, targetNumber: number, duration: number = 2) {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetNumber,
      duration: duration,
      ease: 'power1.inOut',
      onUpdate: () => {
        element.textContent = Math.round(obj.value);
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reset'
      }
    });
  }

  hover3D(element: any, rotationIntensity: number = 15) {
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * rotationIntensity;
      const rotateY = ((centerX - x) / centerX) * rotationIntensity;

      gsap.to(element, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out'
      });
    });
  }

  killAllScrollTriggers() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  refreshScrollTrigger() {
    ScrollTrigger.refresh();
  }

  createTimeline(config?: any) {
    return gsap.timeline(config);
  }
}