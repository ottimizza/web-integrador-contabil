import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { ColumnDefinition } from './models/ColumnDefinition';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'async-table',
  templateUrl: './async-table.component.html'
})
export class AsyncTableComponent implements OnInit {

  data: GenericPageableResponse<any>;

  // Required infos
  @Input() origin: (pageEvent: PageEvent) => Observable<GenericPageableResponse<any>>;
  @Input() definition: ColumnDefinition<any>[];

  // Optional infos
  @Input() pageSizeOptions = [5, 10, 20];
  @Input() displayedColumns: string[];
  @Input() selectable = true;

  // Get selected row
  @Output() rowSelected = new EventEmitter();

  // Indicates if the resultSet is empyt
  @Output() emptyState = new EventEmitter();

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.onPageChange({ length: 0, pageIndex: 0, pageSize: this.pageSizeOptions[0], previousPageIndex: -1 });
  }

  public columns() {
    return this.displayedColumns ? this.displayedColumns : this.definition.map(def => def.id);
  }

  public onPageChange(event: PageEvent) {
    this.toast.showSnack('Aguardando resposta...');
    this.origin(event).subscribe(rs => {
      this.data = rs;
      if (!this.data.records.length) {
        this.emptyState.emit(204);
      }
      this.toast.hideSnack();
    });
  }

  public onSelect(el: any) {
    if (this.selectable) {
      this.rowSelected.emit(el);
    }
  }

}
