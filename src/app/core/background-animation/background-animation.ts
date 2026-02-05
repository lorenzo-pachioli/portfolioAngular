import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';

interface DustParticle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

@Component({
  selector: 'app-background-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-animation.html',
  styleUrls: ['./background-animation.scss']
})
export class BackgroundAnimation implements OnInit, OnDestroy {
  @ViewChild('particlesContainer', { static: true }) particlesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('gradientWrapper', { static: true }) gradientWrapper!: ElementRef<HTMLDivElement>;

  private particleCount = 600;
  private isDestroyed = false;
  private mouseInfluence = { x: 0, y: 0, active: false };
  private dustParticles: Array<DustParticle> = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.createDustParticle();
    }
  }

  ngAfterViewInit(): void {
    this.animateDustParticles();
    this.moveGradientToSmoothContent();
  }

  private moveGradientToSmoothContent(): void {
    if (this.gradientWrapper) {
      document.body.insertBefore(
        this.gradientWrapper.nativeElement,
        document.body.firstChild
      );
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  private createDustParticle(): void {
    const particle = document.createElement('div');
    particle.className = 'particle dust';

    const size = Math.random() * 2 + 0.5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;

    this.particlesContainer.nativeElement.appendChild(particle);

    this.dustParticles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      baseX: x,
      baseY: y
    });
  }

  private animateOneParticle(dust: DustParticle): void {
    dust.x += dust.vx;
    dust.y += dust.vy;

    if (this.mouseInfluence.active) {
      const particleX = (dust.x / 100) * window.innerWidth;
      const particleY = (dust.y / 100) * window.innerHeight;

      const dx = this.mouseInfluence.x - particleX;
      const dy = this.mouseInfluence.y - particleY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / 200) * 0.9;

        dust.x -= Math.cos(angle) * force;
        dust.y -= Math.sin(angle) * force;
      }
    }

    dust.x += (dust.baseX - dust.x) * 0.001;
    dust.y += (dust.baseY - dust.y) * 0.001;

    if (dust.x < -5) dust.x = 105;
    if (dust.x > 105) dust.x = -5;
    if (dust.y < -5) dust.y = 105;
    if (dust.y > 105) dust.y = -5;

    dust.element.style.left = `${dust.x}%`;
    dust.element.style.top = `${dust.y}%`;
  }

  private animateDustParticles(): void {
    const animate = () => {
      if (this.isDestroyed) return;

      this.dustParticles.forEach(dust => {
        this.animateOneParticle(dust);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseInfluence = {
      x: event.clientX,
      y: event.clientY,
      active: true
    };

    setTimeout(() => {
      this.mouseInfluence.active = false;
    }, 100);
    const mouseX = (event.clientX / window.innerWidth) * 100;
    const mouseY = (event.clientY / window.innerHeight) * 100;

  }
}
