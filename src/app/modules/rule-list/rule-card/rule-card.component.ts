import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

import { RuleCreateFormat, PostFormatRule, Rule, Condicao } from '@shared/models/Rule';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { CompleteRule } from '@shared/models/CompleteRule';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ruleico',
  templateUrl: './rule-card.component.html',
  styleUrls: ['./rule-card.component.scss']
})
export class RuleCardComponent {

  @Input() rules: CompleteRule;
  @Input() index: number;
  @Output() downAll: EventEmitter<number> = new EventEmitter();
  @Output() upAll: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() update: EventEmitter<string> = new EventEmitter();
  @Output() clone: EventEmitter<CompleteRule> = new EventEmitter();

  haveToBeShown = false;

  constructor(@Inject(DOCUMENT) public doc: Document) { }

  get info() {
    return {
      upAll: 'Subir regra',
      upDown: 'Descer regra',
      trash: 'Excluir esta regra',
      clone: 'Clonar esta regra',
      edit: 'Alterar esta regra'
    };
  }

  up() {
    this.upAll.emit(this.index);
  }

  down() {
    this.downAll.emit(this.index);
  }

  getText(rule: PostFormatRule) {
    // // return `${Rule.getFieldName(rule.campo)} ${this._getCondition(rule.condicao)} ${rule.valor}`;

    return {
      field: Rule.getFieldName(rule.campo, this.rules.tipoLancamento),
      text: ` ${this._getCondition(rule.condicao)} `,
      value: rule.valor
    };
  }

  get account() {
    return StringCutterUtils.cut(this.rules.contaMovimento, 20);
  }

  mustBeShown() {
    const width = window.innerWidth ?? this.doc.documentElement.clientWidth ?? this.doc.body.clientWidth;
    return width >= 968 || this.haveToBeShown;
  }

  getFullRule() {
    let rule = '';
    this.rules.regras.forEach(rl => {
      rule += `${Rule.getFieldName(rl.campo, this.rules.tipoLancamento)} ${this._getCondition(rl.condicao)} ${rl.valor}. `;
    });
    return StringCutterUtils.cut(rule, 100);
  }

  cloning() {
    const regras: PostFormatRule[] = [];
    this.rules.regras.forEach(r => {
      regras.push({ campo: r.campo, condicao: r.condicao, valor: r.valor });
    });
    this.clone.emit(this.rules);
    this.haveToBeShown = false;
  }

  close() {
    // this.rules = null;
    this.delete.emit(this.index);
    this.haveToBeShown = true;
  }

  openModal(newCamp?: boolean) {
    const text = JSON.stringify(this.rules);
    const rules = JSON.parse(text);
    if (newCamp) {
      rules.regras.push({ campo: null, condicao: null, grupoRegra: null, id: null, valor: null });
    }
    this.update.emit(JSON.stringify(rules));
    this.haveToBeShown = false;
  }

  private _getCondition(condition: Condicao) {
    if (condition === Condicao.CONTEM) {
      return 'CONTÉM';
    } else if (condition === Condicao.NAO_CONTEM) {
      return 'NÃO CONTÉM';
    } else if (condition === Condicao.COMECAO_COM) {
      return 'COMEÇA COM';
    } else if (condition === Condicao.IGUAL) {
      return 'É IGUAL A';
    }
  }

}
