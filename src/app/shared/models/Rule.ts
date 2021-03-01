import { EntryUtils } from '@shared/utils/entry.utils';

export enum RuleType {
  RULE,
  HISTORIC
}

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

  public reduce() {
    const rules = this.regras.map((rule, id) => Object.assign(rule, { id }));
    this.regras = rules.filter(rule => {
      const sameRule = rules.filter(r => r.campo === rule.campo && r.condicao === rule.condicao && r.valor === rule.valor);
      return (sameRule.length === 1 || sameRule[0].id === rule.id);
    });
    this.regras = this.regras.map(rule => {
      const id = 'id';
      delete rule[id];
      return rule;
    });
  }

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
    public tipoPlanilha: string[];
    public tipoLancamento: number[];
    public tipoMovimento: string[];

    public static getFieldName(field: string, tipoLancamento: number): string {
      return EntryUtils.fromTo(field, { tipoLancamento }).toUpperCase();
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
        text += ` ${this.getFieldName(rule.campo, undefined)} contém ${rule.valor}`;
        if (id !== rules.length - 1) {
          text += ',';
        }
      });
      return text;
    }

    public previewIn() {
      return Rule.previewOut(this._rules);
    }

    public hasOtherFieldsThan(field: string) {
      return this.rules.filter(rule => !['tipoMovimento', 'tipoLancamento', 'tipoPlanilha', field].includes(rule.campo)).length > 0;
    }

    public verify() {
      return this.rules.length > 0;
    }

    public get rules(): PostFormatRule[] {
      const keys = Object.keys(this);
      const values = Object.values(this);
      keys.splice(0, 1);
      values.splice(0, 1);

      this._rules = [];
      for (let i = 0; i < keys.length; i++) {
        if (values[i] !== undefined) {
          this._newRule(keys[i], values[i]);
        }
      }
      return this._rules.filter(r => r.campo && r.valor && r.condicao);
    }

    private _newRule(name: string, values: any[]) {
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

export interface ProposedRule {
  id: number;
  contaMovimento: string;
  camposRegras: string[];
}
