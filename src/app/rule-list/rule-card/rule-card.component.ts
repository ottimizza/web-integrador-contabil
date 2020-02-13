import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Rule, Condicao } from '@shared/models/Rule';
import { RuleEditModalComponent } from '../rule-edit-modal/rule-edit-modal.component';

@Component({
  selector: 'app-ruleico',
  templateUrl: './rule-card.component.html',
  styleUrls: ['./rule-card.component.scss']
})
export class RuleCardComponent {

  @Input() rules: RuleCreateFormat;

  constructor(public dialog: MatDialog) { }

  getText(rule: PostFormatRule) {
    return `${Rule.getFieldName(rule.campo)} ${this._getCondition(rule.condicao)} ${rule.valor}`;
  }

  close() {
    this.rules = null;
  }

  openModal(newCamp?: boolean) {
    const rules = this.rules;
    if (newCamp) {
      rules.regras.push({ campo: '', condicao: 0, valor: '' });
    }
    const dialogRef = this.dialog.open(RuleEditModalComponent, {
      width: '80%',
      maxWidth: '1300px',
      data: { rules },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
