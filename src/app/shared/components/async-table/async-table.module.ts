import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
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
