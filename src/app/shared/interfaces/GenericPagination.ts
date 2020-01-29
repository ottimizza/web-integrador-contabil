import { PageInfo } from '@shared/models/GenericPageableResponse';

export interface GenericPagination {

  page: number;
  pageInfo: PageInfo;
  nextPage(): void;

}
