import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HackingRule } from '../search/models/HackingRule';
import { SearchOption } from '../search/models/SearchOption';
import { SearchRule } from '../search/models/SearchRule';

export class FilterData {
  hackings?: HackingRule[];
  defaultRule?: SearchRule;
  rules?: SearchRule[];
  initialFilter?: SearchOption[];
}

@Component({
  selector: 'default-filter',
  templateUrl: './default-filter.component.html',
})
export class DefaultFilterComponent implements OnInit {

  public filters: SearchOption[] = [];

  @Input()
  public options: FilterData;

  @Output()
  public filterChanged = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.options.initialFilter) {
      this.filters = this.options.initialFilter;
    }
  }

  public apply(event: SearchOption) {
    const index = this.filters.map(filter => filter.id).indexOf(event.id);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    this.filters.push(event);
    this.emit();
  }

  public remove(id: string) {
    const index = this.filters.map(filter => filter.id).indexOf(id);
    this.filters.splice(index, 1);
    this.emit();
  }

  public emit() {
    const filter = {};
    this.filters.forEach(f => Object.assign(filter, f.value));
    this.filterChanged.emit(filter);
  }

}
