import { NgModule } from '@angular/core';
import { BrandComponent } from './brand.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BrandComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    BrandComponent
  ]
})
export class BrandModule {
}
