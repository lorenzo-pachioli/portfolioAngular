import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutMeComponent } from './core/about-me/about-me.component';
import { ContactComponent } from './core/contact/contact.component';
import { HomeComponent } from './core/home/home.component';
import { PortfolioComponent } from './core/portfolio/portfolio.component';
import { SkillsComponent } from './core/skills/skills.component';
import { ElementByIdService } from './shared/services/element-by-id.service';
import { HeaderComponent } from './core/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { WelcomeComponent } from './core/welcome/welcome.component';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'portfolioAngular';
  showScrollToTop = false;
  isWelcomeVisible = true;
  private smoother: any;
  private isMobile: boolean = false;
  private scrollSub!: Subscription;

  @ViewChild(WelcomeComponent) welcomeComponent!: WelcomeComponent;
  @ViewChild(HeaderComponent, { read: ElementRef }) headerRef!: ElementRef;
  @ViewChild(HomeComponent, { read: ElementRef }) homeRef!: ElementRef;
  @ViewChild(SkillsComponent, { read: ElementRef }) skillsRef!: ElementRef;
  @ViewChild(PortfolioComponent, { read: ElementRef }) portfolioRef!: ElementRef;
  @ViewChild(AboutMeComponent, { read: ElementRef }) aboutRef!: ElementRef;
  @ViewChild(ContactComponent, { read: ElementRef }) contactRef!: ElementRef;

  private get sections() {
    return [
      { id: 'home', ref: this.homeRef },
      { id: 'skills', ref: this.skillsRef, once: true },
      { id: 'portfolio', ref: this.portfolioRef },
      { id: 'about', ref: this.aboutRef },
      { id: 'contact', ref: this.contactRef }
    ];
  }

  constructor(
    public element: ElementByIdService,
    public translate: TranslateService,
    private langService: LanguageService
  ) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const DEFAULT_LANG = this.langService.initLang();
    this.translate.use(DEFAULT_LANG);
    this.isMobile = window.innerWidth < 900;
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.element.setHome(this.homeRef);
      this.element.setSkills(this.skillsRef);
      this.element.setPortfolio(this.portfolioRef);
      this.element.setAbout(this.aboutRef);
      this.element.setContact(this.contactRef);
    }, 100);
    this.initScrollSmoother();
    window.scrollTo(0, 0);
    this.setupSideAnimations();
    this.setupScrollTriggers();
    this.setupNavigation();
  }

  private setupNavigation(): void {
    this.scrollSub = this.element.scrollRequest$.subscribe(section => {
      if (section && this.smoother) {
        const targetSection = this.sections.find(s => s.id === section);
        const target = targetSection?.ref?.nativeElement;
        if (target) {
          this.smoother.scrollTo(target, true, 'top top');
        }
      }
    });
  }

  private initScrollSmoother(): void {
    try {
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: this.isMobile ? 1 : 2,
        effects: !this.isMobile,
        normalizeScroll: true,
        smoothTouch: this.isMobile ? 0 : 0.1,
        ignoreMobileResize: true
      });
    } catch (error) {
      console.error('Error ScrollSmoother:', error);
    }
  }

  private setupSideAnimations(): void {
    this.sections.forEach((section, index) => {
      gsap.from(section.ref.nativeElement, {
        x: index % 2 === 0 ? -200 : 200,
        opacity: 0,
        duration: 2.5,
        delay: 0.5,
        ease: 'power3.out',
        once: true,
        scrollTrigger: {
          trigger: section.ref.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => this.setScrollSpeed(0),
          onLeave: () => this.setScrollSpeed(1),
          onEnterBack: () => this.setScrollSpeed(0),
          onLeaveBack: () => this.setScrollSpeed(1),
        }
      });
    });
  }

  private setupScrollTriggers(): void {
    this.sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section.ref.nativeElement,
        start: 'top center',
        end: 'bottom center',
        once: section.once || false,
        onEnter: () => this.onFocus(section.id, true),
        onLeave: () => this.onFocus(section.id, false),
        onEnterBack: () => this.onFocus(section.id, true),
        onLeaveBack: () => this.onFocus(section.id, false),
      });
    });
  }

  onWelcomeComplete(): void {
    this.revealApp();
  }

  private revealApp(): void {
    // Exact measurement using the specific H1 elements as anchors
    const targetTitle = this.homeRef.nativeElement.querySelector('h1');
    const sourceTitle = document.querySelector('.move h1');

    if (!targetTitle || !sourceTitle) {
      this.isWelcomeVisible = false;
      ScrollTrigger.refresh();
      return;
    }

    const targetRect = targetTitle.getBoundingClientRect();
    const sourceRect = sourceTitle.getBoundingClientRect();

    // Exact delta between the title text elements
    const deltaX = targetRect.left - sourceRect.left;
    const deltaY = targetRect.top - sourceRect.top;

    // Trigger WelcomeComponent transition with pixel-perfect deltas
    const welcomeTl = this.welcomeComponent.transitionToHome(deltaX, deltaY);

    // Sync background reveal with app reveal (with 1.2s delay)
    setTimeout(() => {
      document.querySelector('.background')?.classList.add('reveal');
    }, 1200);

    gsap.to('.main-content-wrapper', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      onStart: () => {
        document.querySelector('.main-content-wrapper')?.classList.remove('hidden');
      }
    });

    welcomeTl.add(() => {
      this.isWelcomeVisible = false;
      this.showScrollToTop = !this.element.visible.value.header;

      // Ensure we are at the top when content is revealed
      if (this.smoother) {
        this.smoother.scrollTo(0);
      } else {
        window.scrollTo(0, 0);
      }

      // Refresh GSAP ScrollTriggers
      ScrollTrigger.refresh();
    }, "-=0.2");
  }

  onFocus(component: string, event: boolean): void {
    const visible = event;
    if (component === 'header') {
      this.element.visible.next({ ...this.element.visible.value, header: visible });
      this.showScrollToTop = !visible;
      return;
    }

    const currentVisible = this.element.visible.value;
    if (currentVisible.hasOwnProperty(component)) {
      this.element.visible.next({ ...currentVisible, [component]: visible });
    }
  }

  scrollToTop() {
    if (this.smoother) {
      this.smoother.scrollTo(0, true, 'top top');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private setScrollSpeed(value: number): void {
    if (this.smoother && this.smoother.speed) {
      gsap.to(this.smoother, {
        speed: value,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.smoother) {
      this.smoother.kill();
      this.smoother = null;
    }
  }
}
