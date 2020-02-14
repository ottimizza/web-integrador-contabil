import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Rule, Condicao } from '@shared/models/Rule';
import { RuleEditModalComponent } from '../rule-edit-modal/rule-edit-modal.component';
import { CompleteRule } from '@shared/models/CompleteRule';

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
  @Output() clone: EventEmitter<RuleCreateFormat> = new EventEmitter();

  get info() {
    return {
      upAll: 'Enviar para o topo da lista',
      upDown: 'Enviar para o final da lista',
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
    return `${Rule.getFieldName(rule.campo)} ${this._getCondition(rule.condicao)} ${rule.valor}`;
  }

  cloning() {
    const regras: PostFormatRule[] = [];
    this.rules.regras.forEach(r => {
      regras.push({ campo: r.campo, condicao: r.condicao, valor: r.valor });
    });
    this.clone.emit(new RuleCreateFormat(
      regras,
      this.rules.cnpjEmpresa,
      this.rules.cnpjContabilidade,
      this.rules.tipoLancamento,
      this.rules.idRoteiro,
      this.rules.contaMovimento
    ));
  }

  close() {
    this.rules = null;
    this.delete.emit(this.index);
  }

  openModal(newCamp?: boolean) {
    const text = JSON.stringify(this.rules);
    const rules = JSON.parse(text);
    if (newCamp) {
      rules.regras.push({ campo: null, condicao: null, grupoRegra: null, id: null, valor: null });
    }
    this.update.emit(JSON.stringify(rules));
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
