import { Arquivo } from './Arquivo';
import { Lancamento } from './Lancamento';

export class ImportacaoLancamentosRequest {
  constructor(
    public cnpjContabilidade: string,
    public cnpjEmpresa: string,
    public idRoteiro: string,
    public arquivo: Arquivo,
    public lancamentos: Lancamento[]
  ) {}
}
