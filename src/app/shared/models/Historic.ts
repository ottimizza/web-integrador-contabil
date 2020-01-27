export class HistoricField {

  constructor(public field: string, public value: string) { }

  public static null() {
    return new HistoricField(null, null);
  }

}

export class Historic {


  public id: string;
  public comentarios: string[];
  public campos: HistoricField[];
  public contaMovimento: string;
  public cnpjEmpresa: string;
  public cnpjContabilidade: string;

  constructor() {
    this.comentarios = ['', '', ''];
    const hf = HistoricField.null();
    this.campos = [hf, hf, hf];
  }

  public get preview() {
    const obj = [
      this.comentarios[0],
      this.campos[0].value,
      this.comentarios[1],
      this.campos[1].value,
      this.comentarios[2],
      this.campos[2].value,
      this.comentarios[3]
    ];

    return this._iterate(obj);
  }

  public toParams() {
    const template = (text: string) => {
      return '${' + text + '}';
    };

    const obj = [
      this.id.toString(),
      this.comentarios[0],
      template(this.campos[0].field),
      this.comentarios[1],
      template(this.campos[1].field),
      this.comentarios[2],
      template(this.campos[2].field),
      this.comentarios[3]
    ];

    return {
      historico: this._iterate(obj, true),
      contaMovimento: this.contaMovimento,
      cnpjEmpresa: this.cnpjContabilidade,
      cnpjContabilidade: this.cnpjContabilidade
    };

  }

  private _iterate(array: string[], params?: boolean): string {
    let text = '';
    array.forEach(arr => {
      text += this._verifyAndReturn(arr, params);
    });
    return text;
  }

  private _verifyAndReturn(text: string, params?: boolean): string {
    if (text) {
      return text + ' ';
    } else if (params === true) {
      return 'nenhum';
    } else {
      return '';
    }
  }

}
