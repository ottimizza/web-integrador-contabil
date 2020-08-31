import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AsyncTableComponent } from './async-table.component';

@NgModule({
  declarations: [AsyncTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [AsyncTableComponent]
})
export class DataTableModule { }
