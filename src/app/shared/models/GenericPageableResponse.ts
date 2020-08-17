export class PageInfo {

  hasNext: boolean;
  hasPrevious: boolean;

  pageSize: number;
  pageIndex: number;

  totalPages: number;
  totalElements: number;

  constructor(builder: any) {
    this.hasNext = builder.hasNext;
    this.hasPrevious = builder.hasPrevious;
    this.pageIndex = builder.pageIndex;
    this.pageSize = builder.pageSize;
    this.totalPages = builder.totalPages;
    this.totalElements = builder.totalElements;
  }

  static defaultPageInfo() {
    return new PageInfo({ pageIndex: 0, pageSize: 1, hasNext: true, hasPrevious: false });
  }

}

export class GenericPageableResponse<T> {

  records: Array<T>;
  pageInfo: PageInfo;

}
