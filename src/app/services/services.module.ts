import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language/language.service';



@NgModule({
  declarations: [
    LanguageService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LanguageService
  ]
})
export class ServicesModule { }
