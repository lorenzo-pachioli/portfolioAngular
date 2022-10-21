import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { FeatureModule } from '../feature/feature.module';
import { SkillsComponent } from './skills/skills.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SkillsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FeatureModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    SkillsComponent,
    FooterComponent
  ]
})
export class CoreModule { }
