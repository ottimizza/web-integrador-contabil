import { NgModule } from '@angular/core';
import { LazyImgDirective } from './lazy-img.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LazyImgDirective],
  imports: [CommonModule],
  exports: [LazyImgDirective]
})
export class LazyImgModule {}
