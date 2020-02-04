import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [InfoComponent]
})
export class InfoModule { }
