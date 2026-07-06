import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language/language.service';
import { AnimationCoordinatorService } from './animation-coordinator/animation-coordinator.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    LanguageService,
    AnimationCoordinatorService
  ]
})
export class ServicesModule { }
