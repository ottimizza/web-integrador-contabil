export interface PostFormatRule {

    campo: string;
    condicao: Condicao;
    valor: string;

}

export class RuleCreateFormat {

  constructor(
    public regras: PostFormatRule[],
    public cnpjEmpresa: string,
    public cnpjContabilidade: string,
    public tipoLancamento: number,
    public idRoteiro: string,
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
    public nomeArquivo: string[];

    public static getFieldName(field: string): string {
      let strName = '';
      switch (field) {
        case 'descricao':
          strName = 'FORNECEDOR';
          break;
        case 'documento':
          strName = 'DOCUMENTO';
          break;
        case 'portador':
          strName = 'BANCO';
          break;
        case 'complemento01':
          strName = 'COMPLEMENTO 01';
          break;
        case 'complemento02':
          strName = 'COMPLEMENTO 02';
          break;
        case 'complemento03':
          strName = 'COMPLEMENTO 03';
          break;
        case 'complemento04':
          strName = 'COMPLEMENTO 04';
          break;
        case 'complemento05':
          strName = 'COMPLEMENTO 05';
          break;
        case 'tipoPlanilha':
          strName = 'TIPO DA PLANILHA';
          break;
        case 'nomeArquivo':
          strName = 'NOME DO ARQUIVO';
          break;
      }
      return strName;
    }

    public static previewOut(rules: PostFormatRule[]) {
      let text = '';

      rules.forEach(rule => {
        const id = rules.indexOf(rule);
        if (id === 0) {
          text += 'Se';
        } else if (id === rules.length - 1) {
          text += ' e';
        }
        text += ` ${this.getFieldName(rule.campo)} contém ${rule.valor}`;
        if (id !== rules.length - 1) {
          text += ',';
        }
      });
      return text;
    }

    public previewIn() {
      return Rule.previewOut(this._rules);
    }

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
      this._newRule('nomeArquivo', this.nomeArquivo);
      return this._rules;
    }

    private _newRule(name: string, values: string[]) {
      if (values && values.length > 0) {
        values.forEach(value => {
          this._rules.push(
            { campo: name, condicao: 1, valor: value }
          );
        });
      }
    }

}

export enum Condicao {

  CONTEM = 1,
  NAO_CONTEM,
  COMECAO_COM,
  IGUAL

}
