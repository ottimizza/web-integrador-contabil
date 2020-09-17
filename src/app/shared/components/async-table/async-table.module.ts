import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { AsyncTableComponent } from './async-table.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [AsyncTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    PaginatorModule,
    IconModule,
    MatTooltipModule
  ],
  exports: [AsyncTableComponent]
})
export class AsyncTableModule { }
