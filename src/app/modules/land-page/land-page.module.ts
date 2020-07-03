import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandPageRouting } from './land-page.routing';
import { LandPageComponent } from './page/land-page.component';

@NgModule({
  declarations: [LandPageComponent],
  imports: [CommonModule, LandPageRouting],
  exports: [LandPageComponent]
})
export class LandPageModule {}
