import { NgModule } from '@angular/core';
import { NormalizedLayoutComponent } from './normalized-layout.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { BreadcrumbFilterModule } from '@shared/components/breadcrumb-filter/breadcrumb-filter.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';

@NgModule({
  declarations: [NormalizedLayoutComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    BreadcrumbFilterModule,
    ActionButtonsModule,
    ScrollTrackerModule
  ],
  exports: [NormalizedLayoutComponent]
})
export class NormalizedLayoutModule { }
