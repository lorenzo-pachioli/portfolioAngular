import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { MaterialModule } from '../material/material.module';
import { IsVisibleDirective } from './directives/is-visible.directive';



@NgModule({
  declarations: [
    CardListComponent,
    IsVisibleDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CardListComponent,
    IsVisibleDirective
  ]
})
export class SharedModule { }
