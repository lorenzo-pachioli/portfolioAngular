import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    MapComponent,
    ContactCardComponent,
    DesktopMenuComponent,
    MobileMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LeafletModule,
    ReactiveFormsModule
  ],
  exports: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    MapComponent,
    ContactCardComponent,
    DesktopMenuComponent,
    MobileMenuComponent
  ]
})
export class FeatureModule { }
