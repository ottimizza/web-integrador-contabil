import { Component, Input } from '@angular/core';
import { RuleCreateFormat, PostFormatRule, Rule, Condicao } from '@shared/models/Rule';
import { RuleEditModalComponent } from '../rule-edit-modal/rule-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  modal(text: string) {
    alert(text);
  }

  openModal() {
    const dialogRef = this.dialog.open(RuleEditModalComponent, {
      width: '80%',
      maxWidth: '1300px',
      data: { rules: this.rules }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  private _getCondition(condition: Condicao) {
    if (condition === Condicao.CONTEM) {
      return 'contém';
    } else if (condition === Condicao.NAO_CONTEM) {
      return 'não contém';
    } else if (condition === Condicao.COMECAO_COM) {
      return 'começa com';
    } else if (condition === Condicao.IGUAL) {
      return 'é igual a';
    }
  }
  }
