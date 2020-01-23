export class PostFormatRule {

  constructor(
    public campo: string,
    public condicao: number,
    public valor: string
  ) { }

}

export class RuleCreateFormat {

  constructor(
    public regras: PostFormatRule[],
    public cnpjEmpresa: string,
    public contaMovimento: string
  ) { }

}

export class Rule {

    // tslint:disable: variable-name
    private _rules: PostFormatRule[];
    public descricao: string[];
    public documento: string[];
    public portador: string[];
    public complemento01: string[];
    public complemento02: string[];
    public complemento03: string[];
    public complemento04: string[];
    public complemento05: string[];
    public tipoPlanilha: string[];
    public nomeArquivo: string[];

    public verify() {
      return this.rules.length > 0;
    }

    public get rules(): PostFormatRule[] {
      this._rules = [];
      this._newRule('descricao', this.descricao);
      this._newRule('documento', this.documento);
      this._newRule('portador', this.portador);
      this._newRule('complemento01', this.complemento01);
      this._newRule('complemento02', this.complemento02);
      this._newRule('complemento03', this.complemento03);
      this._newRule('complemento04', this.complemento04);
      this._newRule('complemento05', this.complemento05);
      this._newRule('tipoPlanilha', this.tipoPlanilha);
      this._newRule('nomeArquivo', this.nomeArquivo);
      return this._rules;
    }

    private _newRule(name: string, values: string[]) {
      if (values && values.length > 0) {
        values.forEach(value => {
          this._rules.push(new PostFormatRule(name, 1, value));
        });
      }
    }

}

