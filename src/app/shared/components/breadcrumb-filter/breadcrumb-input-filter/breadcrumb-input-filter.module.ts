import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Design
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Components
import { BreadcrumbInputFilterComponent } from './breadcrumb-input-filter.component';

@NgModule({
  declarations: [
    BreadcrumbInputFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatAutocompleteModule,
  ],
  exports: [
    BreadcrumbInputFilterComponent
  ]
})
export class BreadcrumbInputFilterModule { }
