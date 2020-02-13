import { PageInfo } from '@shared/models/GenericPageableResponse';

export interface GenericPagination {

  pageInfo: PageInfo;
  nextPage(): void;

}
