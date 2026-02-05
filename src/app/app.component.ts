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
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'portfolioAngular';
  showScrollToTop = true;
  private smoother: any;
  private isMobile: boolean = false;
  private scrollSub!: Subscription;

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
    const DEFAULT_LANG = this.langService.initLang();
    this.translate.use(DEFAULT_LANG);
    this.isMobile = window.innerWidth < 900;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.element.setHome(this.homeRef);
      this.element.setSkills(this.skillsRef);
      this.element.setPortfolio(this.portfolioRef);
      this.element.setAbout(this.aboutRef);
      this.element.setContact(this.contactRef);
    }, 100);
    this.initScrollSmoother();
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
        duration: 1.2,
        ease: 'power3.out',
        once: true,
        scrollTrigger: {
          trigger: section.ref.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
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

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.smoother) {
      this.smoother.kill();
      this.smoother = null;
    }
  }
}
