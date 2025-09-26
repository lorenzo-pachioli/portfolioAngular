import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { FeatureModule } from '../feature/feature.module';
import { SkillsComponent } from './skills/skills.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { SocialSideNavComponent } from './social-side-nav/social-side-nav.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateDirective, TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SkillsComponent,
    FooterComponent,
    AboutMeComponent,
    PortfolioComponent,
    ContactComponent,
    SocialSideNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FeatureModule,
    SharedModule,
    TranslateDirective
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    SkillsComponent,
    FooterComponent,
    AboutMeComponent,
    PortfolioComponent,
    ContactComponent,
    SocialSideNavComponent
  ]
})
export class CoreModule { }
