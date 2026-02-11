import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
  standalone: false
})
export class DesktopMenuComponent implements OnInit {

  visible = {
    home: false,
    skills: false,
    portfolio: false,
    about: false,
    contact: false
  }

  @ViewChild('indicator', { read: ElementRef, static: false }) indicator!: ElementRef;

  @ViewChild('homeBtn', { read: ElementRef }) homeBtn!: ElementRef;
  @ViewChild('skillsBtn', { read: ElementRef }) skillsBtn!: ElementRef;
  @ViewChild('portfolioBtn', { read: ElementRef }) portfolioBtn!: ElementRef;
  @ViewChild('aboutBtn', { read: ElementRef }) aboutBtn!: ElementRef;
  @ViewChild('contactBtn', { read: ElementRef }) contactBtn!: ElementRef;

  private activeSectionSub!: Subscription;
  private scrollSub!: Subscription;
  private langSub!: Subscription;
  private scrollIndicatorTl?: gsap.core.Timeline;
  private buttonData: { [key: string]: { center: number, width: number } } = {};

  constructor(public element: ElementByIdService, private translate: TranslateService) {
    this.element.visible.subscribe(currentVisible => {
      this.visible = currentVisible;
    })
  }

  ngOnInit(): void {
    this.activeSectionSub = this.element.activeSection$.subscribe(section => {
      this.updateLinePosition(section);
    });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        this.calculateButtonData();
        this.initScrollProgress();
      }, 100);
    });

    setTimeout(() => {
      this.calculateButtonData();
      this.initScrollProgress();
      this.updateLinePosition(this.element.activeSection.value);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.scrollIndicatorTl) {
      if (this.scrollIndicatorTl.scrollTrigger) this.scrollIndicatorTl.scrollTrigger.kill();
      this.scrollIndicatorTl.kill();
    }
    if (this.activeSectionSub) this.activeSectionSub.unsubscribe();
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.langSub) this.langSub.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateButtonData();
    this.initScrollProgress();
  }

  private calculateButtonData() {
    const sections = ['home', 'skills', 'portfolio', 'about', 'contact'];
    const buttons = [this.homeBtn, this.skillsBtn, this.portfolioBtn, this.aboutBtn, this.contactBtn];

    buttons.forEach((btn, i) => {
      if (btn) {
        const rect = btn.nativeElement.getBoundingClientRect();
        const parentRect = btn.nativeElement.parentElement.getBoundingClientRect();
        this.buttonData[sections[i]] = {
          center: (rect.left - parentRect.left) + (rect.width / 2),
          width: rect.width - 32
        };
      }
    });
  }

  private updateLinePosition(section: string) {
    const data = this.buttonData[section];
    if (data && this.indicator) {
      gsap.to(this.indicator.nativeElement, {
        x: data.center,
        width: data.width,
        xPercent: -50,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }

  private initScrollProgress() {
    if (!this.indicator) return;

    if (this.scrollIndicatorTl) {
      if (this.scrollIndicatorTl.scrollTrigger) this.scrollIndicatorTl.scrollTrigger.kill();
      this.scrollIndicatorTl.kill();
    }

    const sections = ['home', 'skills', 'portfolio', 'about', 'contact'];

    this.scrollIndicatorTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        invalidateOnRefresh: true
      }
    });

    const homeData = this.buttonData['home'];
    if (homeData) {
      this.scrollIndicatorTl.set(this.indicator.nativeElement, {
        x: homeData.center,
        width: homeData.width,
        xPercent: -50
      });
    }

    sections.forEach((sectionId, index) => {
      const data = this.buttonData[sectionId];
      if (!data) return;

      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl && sectionId !== 'home') return;

      if (sectionId === 'home') {
        this.scrollIndicatorTl?.to(this.indicator.nativeElement, {
          x: data.center,
          width: data.width,
          xPercent: -50,
          ease: 'none',
          duration: 0.1
        }, 0);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top center",
      });

      const scrollPos = st.start;
      const maxScroll = ScrollTrigger.maxScroll(window);
      const progressPoint = Math.max(0.01, scrollPos / maxScroll);

      st.kill();

      this.scrollIndicatorTl?.to(this.indicator.nativeElement, {
        x: data.center,
        width: data.width,
        xPercent: -50,
        ease: 'none',
        duration: 1
      }, progressPoint * 100);
    });
  }

  scroll(el: string) {
    this.element.requestScroll(el);
  }


}
