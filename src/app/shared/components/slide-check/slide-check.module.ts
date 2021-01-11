import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideCheckComponent } from './slide-check.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SlideCheckComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatRippleModule,
    MatTooltipModule
  ],
  exports: [SlideCheckComponent]
})
export class SlideCheckModule { }
