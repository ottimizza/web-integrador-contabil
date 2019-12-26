// tslint:disable: variable-name
export class Lancamento {
  constructor(
    private _dataMovimento: Date,
    private _documento: string,
    private _descricao: string,
    private _centroCusto: string,
    // private _arquivo: ArquivoDTO,
    private _tipoPlanilha: string,
    private _tipoLancamento: number,
    private _tipoMovimento: TipoMovimento,
    private _contaMovimento: string,
    private _contaContraPartida: string,
    private _tipoConta: number,
    private _valorOriginal: number,
    private _valorPago: number,
    private _valorJuros: number,
    private _valorDesconto: number,
    private _valorMulta: number,
    private _complemento01: string,
    private _complemento02: string,
    private _complemento03: string,
    private _complemento04: string,
    private _complemento05: string,
    private _cnpjEmpresa: string,
    private _cnpjContabilidade: string,
    private _idRoteiro: string
  ) {}
}

export enum TipoMovimento {
  CTB = 'CTB',
  CTBJUR = 'CTBJUR',
  CTBPORTADOR = 'CTBPORTADOR'
}

export class LancamentoBuilder {
  private _dataMovimento: Date;
  private _documento: string;
  private _descricao: string;
  private _centroCusto: string;
  // private _arquivo: ArquivoDTO;
  private _tipoPlanilha: string;
  private _tipoLancamento: number;
  private _tipoMovimento: TipoMovimento;
  private _contaMovimento: string;
  private _contaContraPartida: string;
  private _tipoConta: number;
  private _valorOriginal: number;
  private _valorPago: number;
  private _valorJuros: number;
  private _valorDesconto: number;
  private _valorMulta: number;
  private _complemento01: string;
  private _complemento02: string;
  private _complemento03: string;
  private _complemento04: string;
  private _complemento05: string;
  private _cnpjEmpresa: string;
  private _cnpjContabilidade: string;
  private _idRoteiro: string;

  public static null(): Lancamento {
    return new Lancamento(
      null,
      null,
      null,
      null,
      // null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  public withDataMovimento(dataMovimento: Date): LancamentoBuilder {
    this._dataMovimento = dataMovimento;
    return this;
  }

  public withDocumento(documento: string): LancamentoBuilder {
    this._documento = documento;
    return this;
  }

  public withDescricao(descricao: string): LancamentoBuilder {
    this._descricao = descricao;
    return this;
  }

  public withCentroCusto(centroCusto: string): LancamentoBuilder {
    this._centroCusto = centroCusto;
    return this;
  }

  // public withArquivo(arquivo: ArquivoDTO): LancamentoBuilder{
  //    this._arquivo = arquivo;
  //    return this;
  // }

  public withTipoPlanilha(tipoPlanilha: string): LancamentoBuilder {
    this._tipoPlanilha = tipoPlanilha;
    return this;
  }

  public withTipoLancamento(tipoLancamento: number): LancamentoBuilder {
    this._tipoLancamento = tipoLancamento;
    return this;
  }

  public withTipoMovimento(tipoMovimento: TipoMovimento): LancamentoBuilder {
    this._tipoMovimento = tipoMovimento;
    return this;
  }

  public withContaMovimento(contaMovimento: string): LancamentoBuilder {
    this._contaMovimento = contaMovimento;
    return this;
  }

  public withContaContraPartida(contaContraPartida: string): LancamentoBuilder {
    this._contaContraPartida = contaContraPartida;
    return this;
  }

  public withTipoConta(tipoConta: number): LancamentoBuilder {
    this._tipoConta = tipoConta;
    return this;
  }

  public withValorOriginal(valorOriginal: number): LancamentoBuilder {
    this._valorOriginal = valorOriginal;
    return this;
  }

  public withValorPago(valorPago: number): LancamentoBuilder {
    this._valorPago = valorPago;
    return this;
  }

  public withValorJuros(valorJuros: number): LancamentoBuilder {
    this._valorJuros = valorJuros;
    return this;
  }

  public withValorDesconto(valorDesconto: number): LancamentoBuilder {
    this._valorDesconto = valorDesconto;
    return this;
  }

  public withValorMulta(valorMulta: number): LancamentoBuilder {
    this._valorMulta = valorMulta;
    return this;
  }

  public withComplemento01(complemento: string): LancamentoBuilder {
    this._complemento01 = complemento;
    return this;
  }

  public withComplemento02(complemento: string): LancamentoBuilder {
    this._complemento02 = complemento;
    return this;
  }

  public withComplemento03(complemento: string): LancamentoBuilder {
    this._complemento03 = complemento;
    return this;
  }

  public withComplemento04(complemento: string): LancamentoBuilder {
    this._complemento04 = complemento;
    return this;
  }

  public withComplemento05(complemento: string): LancamentoBuilder {
    this._complemento05 = complemento;
    return this;
  }

  public withCnpjEmpresa(cnpjEmpresa: string): LancamentoBuilder {
    this._cnpjEmpresa = cnpjEmpresa;
    return this;
  }

  public withCnpjContabilidade(cnpjContabilidade: string): LancamentoBuilder {
    this._cnpjContabilidade = cnpjContabilidade;
    return this;
  }

  public withIdRoteiro(idRoteiro: string): LancamentoBuilder {
    this._idRoteiro = idRoteiro;
    return this;
  }

  public build(): Lancamento {
    return new Lancamento(
      this._dataMovimento,
      this._documento,
      this._descricao,
      this._centroCusto,
      this._tipoPlanilha,
      this._tipoLancamento,
      this._tipoMovimento,
      this._contaMovimento,
      this._contaContraPartida,
      this._tipoConta,
      this._valorOriginal,
      this._valorPago,
      this._valorJuros,
      this._valorDesconto,
      this._valorMulta,
      this._complemento01,
      this._complemento02,
      this._complemento03,
      this._complemento04,
      this._complemento05,
      this._cnpjEmpresa,
      this._cnpjContabilidade,
      this._idRoteiro
    );
  }
}
