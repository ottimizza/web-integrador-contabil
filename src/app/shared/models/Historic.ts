export class HistoricField {
  constructor(public field: string, public value: string) { }

  public static null() {
    return new HistoricField(null, null);
  }
}


export class FormattedHistoric {

  public id: number;
  public dataCriacao: string;
  public dataAtualizacao: string;

  constructor(
    public historico: string,
    public contaMovimento: string,
    public tipoLancamento: number,
    public idRoteiro: string,
    public cnpjEmpresa: string,
    public cnpjContabilidade: string
  ) {}

}


export class Historic {
  public id: string;
  public com1: string;
  public field1: HistoricField;
  public com2: string;
  public field2: HistoricField;
  public com3: string;
  public field3: HistoricField;
  public com4: string;

  constructor() {
    this.field1 = HistoricField.null();
    this.field2 = HistoricField.null();
    this.field3 = HistoricField.null();
  }

  public get preview() {
    const array = this._comments([
      { text: this.field1.value, param: false },
      { text: this.field2.value, param: false },
      { text: this.field3.value, param: false }
    ]);
    return this._iterate(array);
  }

  public historic(contaMovimento: string, cnpjEmpresa: string, cnpjContabilidade: string, tipoLancamento: number, idRoteiro: string): FormattedHistoric {
    return new FormattedHistoric(
      this._toParams(),
      contaMovimento,
      tipoLancamento,
      idRoteiro,
      cnpjEmpresa,
      cnpjContabilidade
    );
  }

  private _toParams() {
    const array = this._comments([
      { text: this.field1.field, param: true },
      { text: this.field2.field, param: true },
      { text: this.field3.field, param: true }
    ]);
    const text = this._iterate(array);
    if (this.id) {
      return `CodigoHistorico:${this.id}$ ${text}`;
    }
    return `$ ${text}`;

  }

  private _comments(fields: any[]) {
    return [
      { text: this.com1, param: false },
      fields[0],
      { text: this.com2, param: false },
      fields[1],
      { text: this.com3, param: false },
      fields[2],
      { text: this.com4, param: false }
    ];
  }

  private _iterate(array: any[]) {
    let text = '';
    array.forEach(arr => {
      text += this._verifyAndReturn(arr);
    });
    return text;
  }

  private _verifyAndReturn(obj: any): string {
    let yes: string;
    let no: string;

    if (obj.param === true) {
      yes = '${' + obj.text + '} ';
      no = '${nenhum} ';
    } else {
      yes = obj.text + ' ';
      no = '';
    }
    return obj.text ? yes : no;
  }
}
