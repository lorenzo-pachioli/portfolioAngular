import { Component, ViewChild, ElementRef } from '@angular/core';
import { AboutMeComponent } from './core/about-me/about-me.component';
import { ContactComponent } from './core/contact/contact.component';
import { HomeComponent } from './core/home/home.component';
import { PortfolioComponent } from './core/portfolio/portfolio.component';
import { SkillsComponent } from './core/skills/skills.component';
import { ElementByIdService } from './shared/services/element-by-id.service';
import { HeaderComponent } from './core/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {

  title = 'portfolioAngular';
  showScrollToTop = true;
  @ViewChild(HeaderComponent, { read: ElementRef }) headerRef!: ElementRef;
  @ViewChild(HomeComponent, { read: ElementRef }) homeRef!: ElementRef;
  @ViewChild(SkillsComponent, { read: ElementRef }) skillsRef!: ElementRef;
  @ViewChild(PortfolioComponent, { read: ElementRef }) portfolioRef!: ElementRef;
  @ViewChild(AboutMeComponent, { read: ElementRef }) aboutRef!: ElementRef;
  @ViewChild(ContactComponent, { read: ElementRef }) contactRef!: ElementRef;

  constructor(public element: ElementByIdService, public translate: TranslateService, private langService: LanguageService) {
    const DEFAULT_LANG = this.langService.initLang();
    this.translate.use(DEFAULT_LANG);
  }

  ngAfterViewInit(): void {
    this.element.setHome(this.homeRef);
    this.element.setSkills(this.skillsRef);
    this.element.setPortfolio(this.portfolioRef);
    this.element.setAbout(this.aboutRef);
    this.element.setContact(this.contactRef);
  }


  onFocus(component: string, event: boolean): void {
    const visible = event;
    if (component === 'header') {
      this.element.visible.next({ ...this.element.visible.value, header: visible });
      this.showScrollToTop = !visible;
    }
    if (component === 'home') {
      this.element.visible.next({ ...this.element.visible.value, home: visible });
    }
    if (component === 'skills') {
      this.element.visible.next({ ...this.element.visible.value, skills: visible });
    }
    if (component === 'portfolio') {
      this.element.visible.next({ ...this.element.visible.value, portfolio: visible });
    }
    if (component === 'about') {
      this.element.visible.next({ ...this.element.visible.value, about: visible });
    }
    if (component === 'contact') {
      this.element.visible.next({ ...this.element.visible.value, contact: visible });
    }

  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
