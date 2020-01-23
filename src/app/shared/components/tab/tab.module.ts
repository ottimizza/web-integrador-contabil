import { NgModule } from '@angular/core';
import { TabComponent } from './tab.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TabComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [TabComponent]
})
export class TabModule { }
