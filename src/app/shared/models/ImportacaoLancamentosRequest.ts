import { Lancamento } from './Lancamento';

export class ImportacaoLancamentosRequest {

  public records: Lancamento[];
  public pageInfo: PageInfo;

}

export class PageInfo {

  public hasNext: boolean;
  public hasPrevious: boolean;
  public pageSize: number;
  public pageIndex: number;
  public totalPages: number;
  public totalElements: number;

}
