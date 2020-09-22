import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { PORTUGUESE_PAGINATOR_INTL } from './lang/paginator-intl';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: PORTUGUESE_PAGINATOR_INTL() }],
  exports: [PaginatorComponent]
})
export class PaginatorModule {}
