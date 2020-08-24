import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { ColumnDirective } from './column/column.directive';

@NgModule({
  declarations: [
    ContainerComponent,
    RowComponent,
    ColumnDirective
  ],
  imports: [CommonModule],
  exports: [
    ContainerComponent,
    RowComponent,
    ColumnDirective
  ]
})
export class FlexModule {}
