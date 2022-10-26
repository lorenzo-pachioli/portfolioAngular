import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LeafletModule
  ],
  exports: [
    PortfolioGridComponent,
    ProjectInfoComponent,
    MapComponent
  ]
})
export class FeatureModule { }
