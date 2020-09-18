import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidedTourService, NgxGuidedTourModule } from '@gobsio/ngx-guided-tour';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxGuidedTourModule.forRoot()
  ],
  exports: [BreadcrumbComponent],
  providers: [
    { provide: GuidedTourService }
  ]
})
export class BreadcrumbModule {
}
