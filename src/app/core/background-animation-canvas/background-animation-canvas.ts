import {
  Component, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, ChangeDetectionStrategy, inject, NgZone
} from '@angular/core';
import { AnimationCoordinatorService } from 'src/app/services/animation-coordinator/animation-coordinator.service';

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface Particle3D {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  baseX: number; baseY: number;
  size: number;
  opacity: number;
}

// ─── Constantes ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 500;
const FOCAL_LENGTH = 400;
const MAX_Z = 600;
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;


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

  private readonly ngZone = inject(NgZone);
  private readonly coordinator = inject(AnimationCoordinatorService);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle3D[] = [];
  private particleColor = '#FF4081';

  private mouseX = 0;
  private mouseY = 0;
  private mouseActive = false;
  private mouseTimeout: ReturnType<typeof setTimeout> | null = null;

  private unregisterTick!: () => void;
  private cleanupMouse!: () => void;
  private cleanupResize!: () => void;

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const style = getComputedStyle(document.documentElement);
    this.particleColor = style.getPropertyValue('--color5').trim() || '#FF4081';

    this.resizeCanvas();
    this.initParticles();

    this.ngZone.runOutsideAngular(() => {
      // Sin RAF propio: el coordinator llama a onTick() en cada frame del gsap.ticker
      this.unregisterTick = this.coordinator.register(() => this.onTick());

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

      const resizeHandler = () => this.resizeCanvas();
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

  private initParticles(): void {
    this.particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      return {
        x, y,
        z: Math.random() * MAX_Z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.1) * 0.3,
        baseX: x, baseY: y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2
      };
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ─── Tick coordinado ──────────────────────────────────────────────────────────

  private onTick(): void {
    const { canRender, frameRate } = this.coordinator.particlePermission();

    if (!canRender) return;

    if (frameRate === 'half' && this.coordinator.tickCount % 2 !== 0) return;

    this.renderFrame();
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  private renderFrame(): void {
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const { mouseActive, mouseX, mouseY } = this;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = this.particleColor;

    for (const p of this.particles) {
      this.updateParticle(p, centerX, centerY, mouseActive, mouseX, mouseY);
    }
  }

  private updateParticle(
    p: Particle3D,
    centerX: number, centerY: number,
    mouseActive: boolean, mouseX: number, mouseY: number
  ): void {
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
    const px = centerX + p.x * scale;
    const py = centerY + p.y * scale;

    // Interacción mouse: distSq evita sqrt en partículas fuera del radio
    if (mouseActive && p.z >= 0 && p.z <= 300) {
      const dx = mouseX - px;
      const dy = mouseY - py;
      const distSq = dx * dx + dy * dy;

      if (distSq < MOUSE_RADIUS_SQ) {
        const dist = Math.sqrt(distSq); // solo cuando está dentro del radio
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / MOUSE_RADIUS) * 0.9 * 20;

        p.x -= (Math.cos(angle) * force) / scale;
        p.y -= (Math.sin(angle) * force) / scale;
      }
    }

    p.baseX += p.vx;
    p.baseY += p.vy;
    p.x += (p.baseX - p.x) * 0.001;
    p.y += (p.baseY - p.y) * 0.001;

    if (p.z < 0) p.z = MAX_Z;
    if (p.z > MAX_Z) p.z = 0;

    if (p.baseX < -1500) p.baseX = 1500;
    else if (p.baseX > 1500) p.baseX = -1500;
    if (p.baseY < -1500) p.baseY = 1500;
    else if (p.baseY > 1500) p.baseY = -1500;

    const alpha = Math.max(0, Math.min(1, p.opacity * scale));
    this.ctx.globalAlpha = alpha;
    this.ctx.beginPath();
    this.ctx.arc(px, py, Math.max(0.1, p.size * scale), 0, Math.PI * 2);
    this.ctx.fill();
  }
}
