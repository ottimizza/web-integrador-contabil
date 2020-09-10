
export const TipoLancamento = {
  PAGAMENTOS: 1,
  RECEBIMENTOS: 2
};

export class Lancamento {

  public id: number;
  public dataMovimento: string;
  public documento: string;
  public descricao: string;
  public portador: string;
  public centroCusto: string;
  public arquivo: Arquivo;
  public tipoPlanilha: string;
  public tipoLancamento: number;
  public tipoMovimento: string;
  public contaMovimento: string;
  public contaSugerida: string;
  public contaContraPartida: string;
  public tipoConta: number;
  public valorOriginal: number;
  public valorPago: number;
  public valorJuros: number;
  public valorDesconto: number;
  public valorMulta: number;
  public complemento01: string;
  public complemento02: string;
  public complemento03: string;
  public complemento04: string;
  public complemento05: string;
  public cnpjEmpresa: string;
  public cnpjContabilidade: string;
  public idRoteiro: string;
  public nomeArquivo: string;
  public ativo: boolean;
  public competencia: string;
  public competenciaAnterior: string;
}

export class Arquivo {
  id: number;
  nome: string;
  cnpjEmpresa: string;
  cnpjContabilidade: string;
  labelComplemento01: string;
  labelComplemento02: string;
  labelComplemento03: string;
  labelComplemento04: string;
  labelComplemento05: string;
}
