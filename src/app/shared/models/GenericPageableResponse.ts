import { KeyMap } from './KeyMap';

export class PageInfo {

  hasNext: boolean;
  hasPrevious: boolean;

  pageSize: number;
  pageIndex: number;

  totalPages: number;
  totalElements: number;

  constructor(builder: KeyMap<PageInfo>) {
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

  public static fromDefaultPagination<T>(response: DefaultPagination<T>) {
    const gpr = new GenericPageableResponse<T>();
    gpr.records = response.content;
    gpr.pageInfo = {
      hasNext: !response.last,
      hasPrevious: !response.first,
      pageIndex: response.page,
      pageSize: response.size,
      totalElements: response.totalElements,
      totalPages: response.totalPages
    };
    return gpr;
  }

}

interface DefaultPagination<T> {

  content: T[];
  size: number;
  first: boolean;
  last: boolean;
  page: number;
  totalElements: number;
  totalPages: number;

}
