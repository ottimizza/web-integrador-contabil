import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { PageEvent } from '@angular/material';

import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { ColumnDefinition } from './models/ColumnDefinition';

@Component({
  selector: 'async-table',
  templateUrl: './async-table.component.html'
})
export class AsyncTableComponent implements OnInit, OnChanges {

  // Lógica interna
  data: GenericPageableResponse<any>;
  selectedIndex = -1;

  // Informações necessárias
  @Input() origin: (pageEvent: PageEvent) => Observable<GenericPageableResponse<any>>;
  @Input() definition: ColumnDefinition<any>[];

  // Informações opcionais
  @Input() pageSizeOptions = [5, 10, 20];
  @Input() displayedColumns: string[];
  @Input() selectable = true;
  @Input() reload: any;

  // Obtém a linha selecionada
  @Output() rowSelected = new EventEmitter();

  // Indica se o resultado é vazio
  @Output() emptyState = new EventEmitter();

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.onPageChange({ length: 0, pageIndex: 0, pageSize: this.pageSizeOptions[0], previousPageIndex: -1 });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'reload' && this.data) {
        const pi = this.data.pageInfo;
        this.onPageChange({ length: pi.totalElements, pageIndex: pi.pageIndex, pageSize: pi.pageSize, previousPageIndex: pi.pageIndex });
      }
    }
  }

  public columns() {
    return this.displayedColumns ? this.displayedColumns : this.definition.map(def => def.id);
  }

  public onPageChange(event: PageEvent) {
    this.toast.showSnack('Aguardando resposta...');
    this.origin(event).subscribe(rs => {
      this.data = rs;
      console.log(this.data.records[0]);
      if (!this.data.records.length) {
        this.emptyState.emit(204);
      }
      this.toast.hideSnack();
    });
  }

  public onSelect(el: any, index: number) {
    if (this.selectable) {
      this.rowSelected.emit(el);
      this.selectedIndex = index;
    }
  }

}
