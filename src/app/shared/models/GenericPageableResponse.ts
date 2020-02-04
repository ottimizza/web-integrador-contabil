export class PageInfo {

  hasNext: boolean;
  hasPrevious: boolean;

  pageSize: number;
  pageIndex: number;

  totalPages: number;
  totalElements: number;

}

export class GenericPageableResponse<T> {

  records: Array<T>;
  pageInfo: PageInfo;

}
