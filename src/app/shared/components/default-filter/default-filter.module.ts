import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ComplexSearchModule } from '../search/complex-search.module';
import { DefaultFilterComponent } from './default-filter.component';

@NgModule({
  declarations: [DefaultFilterComponent],
  imports: [
    CommonModule,
    ComplexSearchModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [DefaultFilterComponent]
})
export class DefaultFilterModule {}
