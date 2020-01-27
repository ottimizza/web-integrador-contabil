export class HistoricField {
  constructor(public field: string, public value: string) {}

  public static null() {
    return new HistoricField(null, null);
  }
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
    const hf = HistoricField.null();
    this.field1 = hf;
    this.field2 = hf;
    this.field3 = hf;
  }

  public get preview() {
    const array = this._comments([
      { text: this.field1.value, param: false },
      { text: this.field2.value, param: false },
      { text: this.field3.value, param: false }
    ]);
    return this._iterate(array);
  }

  public toParams() {
    const array = this._comments([
      { text: this.field1.field, param: true },
      { text: this.field2.field, param: true },
      { text: this.field3.field, param: true },
    ]);
    return this._iterate(array);
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
