import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() length = 0;
  @Input() pageSize = 0;
  @Input() pageSizeOptions = [5, 10, 20];

  @Output() page = new EventEmitter<PageEvent>();

}
