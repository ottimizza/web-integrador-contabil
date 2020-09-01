import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AsyncTableComponent } from './async-table.component';
import { PaginatorModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [AsyncTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    PaginatorModule
  ],
  exports: [AsyncTableComponent]
})
export class AsyncTableModule { }
