import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsMenuComponent } from './options-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { OpenMenuDirective } from './open-menu/open-menu.directive';



@NgModule({
  declarations: [OptionsMenuComponent, OpenMenuDirective],
  imports: [
    CommonModule,
    MatMenuModule
  ],
  exports: [OpenMenuDirective, OptionsMenuComponent]
})
export class OptionsMenuModule { }
