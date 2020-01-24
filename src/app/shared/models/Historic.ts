export class HistoricField {

  constructor(public field: string, public value: string) { }

}

export class Historic {


  public id: number;
  public comentario1: string;
  public comentario2: string;
  public comentario3: string;
  public comentario4: string;
  public campo1: HistoricField;
  public campo2: HistoricField;
  public campo3: HistoricField;
  public contaMovimento: string;
  public cnpjEmpresa: string;
  public cnpjContabilidade: string;

  public get preview() {
    const obj = [
      this.comentario1,
      this.campo1.value,
      this.comentario2,
      this.campo2.value,
      this.comentario3,
      this.campo3.value,
      this.comentario4
    ];

    return this._iterate(obj);
  }

  public toParams() {
    const template = (text: string) => {
      return '${' + text + '}';
    };

    const obj = [
      this.id.toString(),
      this.comentario1,
      template(this.campo1.field),
      this.comentario2,
      template(this.campo2.field),
      this.comentario3,
      template(this.campo3.field),
      this.comentario4
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
