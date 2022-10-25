import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { ProjectInfoComponent } from './project-info/project-info.component';



@NgModule({
  declarations: [
    PortfolioGridComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PortfolioGridComponent,
    ProjectInfoComponent
  ]
})
export class FeatureModule { }
