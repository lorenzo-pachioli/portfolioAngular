import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

interface Particle3D {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
}

@Component({
    selector: 'app-background-animation-canvas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './background-animation-canvas.html',
    styleUrls: ['./background-animation-canvas.scss']
})
export class BackgroundAnimationCanvas implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private particles: Particle3D[] = [];
    private particleCount = 800;
    private animationId!: number;
    private isDestroyed = false;

    // Parámetros de la perspectiva
    private focalLength = 400;
    private minZ = 0;
    private maxZ = 600;

    private mouseX = 0;
    private mouseY = 0;
    private mouseActive = false;
    private mouseTimeout: any;
    private particleColor = '#FF4081'; // Fallback

    constructor() { }

    ngOnInit(): void {
        this.initParticles();
    }

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        // Obtener el color del CSS variable
        const style = getComputedStyle(document.documentElement);
        this.particleColor = style.getPropertyValue('--color5').trim() || '#FF4081';

        this.resize();
        this.animate();
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
        cancelAnimationFrame(this.animationId);
        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
    }

    @HostListener('window:resize')
    onResize(): void {
        this.resize();
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.mouseActive = true;

        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => {
            this.mouseActive = false;
        }, 100);
    }

    private resize(): void {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    private initParticles(): void {
        for (let i = 0; i < this.particleCount; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            this.particles.push({
                x: x,
                y: y,
                z: Math.random() * (this.maxZ - this.minZ) + this.minZ,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                vz: (Math.random() - 0.1) * 0.3,
                baseX: x,
                baseY: y,
                size: Math.random() * 2 + 0.5, // Más pequeñas
                opacity: Math.random() * 0.6 + 0.2
            });
        }
    }

    private animate(): void {
        if (this.isDestroyed) return;

        this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
        this.ctx.fillStyle = this.particleColor;

        const centerX = this.canvasRef.nativeElement.width / 2;
        const centerY = this.canvasRef.nativeElement.height / 2;

        this.particles.forEach(p => {
            // Movimiento natural
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Perspectiva
            const scale = this.focalLength / (this.focalLength + p.z);
            const px = centerX + p.x * scale;
            const py = centerY + p.y * scale;

            // Interacción con mouse para Z entre 0 y 300
            if (this.mouseActive && p.z >= 0 && p.z <= 300) {
                const dx = this.mouseX - px;
                const dy = this.mouseY - py;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (1 - distance / 200) * 0.9 * (2000 / 100);

                    p.x -= (Math.cos(angle) * force) / scale;
                    p.y -= (Math.sin(angle) * force) / scale;
                }
            }

            // Viento continuo para las posiciones base
            p.baseX += p.vx;
            p.baseY += p.vy;

            // Retorno suave a la "base" impulsada por el viento (0.001 como el original)
            p.x += (p.baseX - p.x) * 0.001;
            p.y += (p.baseY - p.y) * 0.001;

            // Reaparecer si salen del rango Z
            if (p.z < this.minZ) p.z = this.maxZ;
            if (p.z > this.maxZ) p.z = this.minZ;

            // Limites laterales (world wrapping local para el viento)
            if (p.baseX < -1500) p.baseX = 1500;
            if (p.baseX > 1500) p.baseX = -1500;
            if (p.baseY < -1500) p.baseY = 1500;
            if (p.baseY > 1500) p.baseY = -1500;

            const pSize = p.size * scale;

            // Opacidad basada en profundidad Z
            let alpha = p.opacity * scale;
            if (p.z < 0) alpha *= (1 - p.z / this.minZ);

            this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

            this.ctx.beginPath();
            this.ctx.arc(px, py, pSize, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
