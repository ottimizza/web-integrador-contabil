import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    FilterModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
}
