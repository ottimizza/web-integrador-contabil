import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material';
import { DesignSystemModule } from '../ds.module';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    DesignSystemModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
