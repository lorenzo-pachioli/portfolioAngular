import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    MapComponent,
    ContactCardComponent
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
    ContactCardComponent
  ]
})
export class FeatureModule { }
