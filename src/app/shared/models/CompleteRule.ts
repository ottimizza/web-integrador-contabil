import { RuleCreateFormat, PostFormatRule } from './Rule';

class GrupoRegra {
  public id: number;
  public posicao: number;
  public contaMovimento: string;
  public tipoLancamento: string;
  public idRoteiro: string;
  public cnpjEmpresa: string;
  public cnpjContabilidade: string;
}

class Regra {

  public id: number;
  public campo: string;
  public condicao: number;
  public valor: string;
  public grupoRegra: GrupoRegra;

}

export class CompleteRule {

  constructor(
    public id: number,
    public posicao: number,
    public contaMovimento: string,
    public tipoLancamento: number,
    public idRoteiro: string,
    public cnpjEmpresa: string,
    public cnpjContabilidade: string,
    public dataCriacao: string,
    public dataAtualizacao: string,
    public regras: Regra[]
  ) { }

}
