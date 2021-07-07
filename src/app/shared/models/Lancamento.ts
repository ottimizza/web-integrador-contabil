import { fromJson } from '@shared/mixins/from-json.mixin';

export const TipoLancamento = {
  PAGAMENTOS: 1,
  RECEBIMENTOS: 2
};

export class Lancamento {
  public static fromJson = fromJson<Lancamento>(Lancamento);

  public competenciaAnterior: string;
  public contaContraPartida: string;
  public cnpjContabilidade: string;
  public contaMovimento: string;
  public tipoLancamento: number;
  public tipoMovimento: string;
  public contaSugerida: string;
  public valorOriginal: number;
  public dataMovimento: string;
  public valorDesconto: number;
  public complemento01: string;
  public complemento02: string;
  public complemento03: string;
  public complemento04: string;
  public complemento05: string;
  public tipoPlanilha: string;
  public centroCusto: string;
  public cnpjEmpresa: string;
  public nomeArquivo: string;
  public competencia: string;
  public valorJuros: number;
  public valorMulta: number;
  public tipoConta: number;
  public documento: string;
  public descricao: string;
  public idRoteiro: string;
  public valorPago: number;
  public regraId?: number;
  public arquivo: Arquivo;
  public portador: string;
  public ativo: boolean;
  public id: number;
  public uuid: string;
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
