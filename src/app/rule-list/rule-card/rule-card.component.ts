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

  constructor(public dialog: MatDialog) { }

  get info() {
    return {
      upAll: 'Enviar para o topo da lista',
      upDown: 'Enviar para o final da lista',
      trash: 'Excluir esta regra',
      plus: 'Adicionar um novo campo a esta regra',
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

  close() {
    this.rules = null;
  }

  openModal(newCamp?: boolean) {
    const rules = this.rules;
    if (newCamp) {
      rules.regras.push({ campo: null, condicao: null, grupoRegra: null, id: null, valor: null });
    }
    const dialogRef = this.dialog.open(RuleEditModalComponent, {
      width: '80%',
      maxWidth: '1300px',
      data: {
        rule: rules
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
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
