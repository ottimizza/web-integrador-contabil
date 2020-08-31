import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';

export class ColumnDefinition<T> {
  id: string;
  header: string;
  key?: string;
  transform: (value: T) => string;
}

@Component({
  selector: 'async-table',
  templateUrl: './async-table.component.html'
})
export class AsyncTableComponent {

  @Input() origin: Observable<GenericPageableResponse<any>>;
  @Input() definition: ColumnDefinition<any>[];

  @Output() page = new EventEmitter<PageEvent>();

  public onPageChange(event: PageEvent) {
    this.page.emit(event);
  }

}
