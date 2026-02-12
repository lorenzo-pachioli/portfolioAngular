import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  declarations: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    ContactCardComponent,
    DesktopMenuComponent,
    MobileMenuComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateDirective,
    TranslateModule
  ],
  exports: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    ContactCardComponent,
    DesktopMenuComponent,
    MobileMenuComponent,
    LanguageSelectorComponent
  ]
})
export class FeatureModule { }
