import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="welcome-screen">
      <div class="welcome-content">
        <h1 class="welcome-name welcome-hi static" translate="app.WELCOME.HI"></h1>
        <div class="move">
        <h1 class="welcome-name" #welcomeTitle>Lorenzo Pachioli</h1>
        <h2 class="welcome-title" translate="app.TITLE" #welcomeSubTitle></h2>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      z-index: 1000;
      pointer-events: none;
    }
    .welcome-content {
      text-align: center;
      opacity: 0;
      transform: scale(0.5);
    }
    .welcome-name {
      font-size: 60px;
      margin-bottom: 15px;
      color: var(--color1);
    }
    .welcome-title {
      font-size: 40px;
      color: var(--color3);
    }

    @media screen and (max-width: 900px) {
      .welcome-name { font-size: 40px; }
      .welcome-title { font-size: 25px; }
    }
  `]
})
export class WelcomeComponent implements AfterViewInit {
  @Output() animationComplete = new EventEmitter<void>();

  ngAfterViewInit() {
    this.startAnimation();
  }

  private startAnimation() {
    const tl = gsap.timeline({
      onComplete: () => this.animationComplete.emit()
    });

    tl.to('.welcome-content', {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay: 0.5,
      ease: 'back.out(1.7)'
    });

    tl.to({}, { duration: 0.5 });
  }

  public transitionToHome(deltaX: number, deltaY: number): gsap.core.Timeline {
    const tl = gsap.timeline();
    tl.to('.move', {
      x: deltaX,
      y: deltaY,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    tl.to('.welcome-content', {
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    }, '<');

    return tl;
  }
}
