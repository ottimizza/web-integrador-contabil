export class PageInfo {

  hasNext: boolean;
  hasPrevious: boolean;

  pageIndex: number;
  pageSize: number;

  totalPages: number;
  totalElements: number;

}

export class GenericPageableResponse<T> {

  pageInfo: PageInfo;

  records: Array<T>;

}
