import { PageInfo } from './GenericPageableResponse';
import { PageEvent } from '@angular/material';

export class SearchCriteria {

  constructor(
    public pageIndex?: number,
    public pageSize?: number
  ) {}

  public static of(pageCriteria: PageInfo | PageEvent | SearchCriteria) {
    return new SearchCriteria(pageCriteria?.pageIndex, pageCriteria?.pageSize);
  }

  public get data() {
    const that = JSON.parse(JSON.stringify(this));
    delete that.pageIndex;
    delete that.pageSize;
    return that;
  }

  public with(data: object) {
    Object.assign(this, data);
    return this;
  }

  public next() {
    this.pageIndex = this.pageIndex ?? -1;
    this.pageIndex++;
    return this;
  }

}
