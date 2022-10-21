import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
