import { Component, OnInit } from '@angular/core';
import { RuleCreateFormat, PostFormatRule, Rule } from '@shared/models/Rule';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { MatDialog } from '@angular/material/dialog';
import { RuleGridComponent } from 'app/transacoes/transaction-detail/rule-creator/rule-grid.component';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';

@Component({
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit, GenericDragDropList {

  rows: RuleCreateFormat[] = [];
  hasBusiness = false;

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.rows.push(
        new RuleCreateFormat(
            [
              { campo: 'descricao', condicao: 1, valor: i.toString() },
              { campo: 'complemento01', condicao: 1, valor: 'atrasado' },
              { campo: 'complemento02', condicao: 1, valor: 'extra' },
              // { campo: 'complemento03', condicao: 1, valor: 'terceirizado' },
              // { campo: 'nomeArquivo', condicao: 1, valor: 'arquivo3214.xlsx' }
            ],
            'um cnpj bem daora',
            '1312418921'
          )
      );
    }
  }

  get info() {
    return {
      text1: 'Insira o nome da empresa que deseja filtrar',
      text2: 'Selecione entre Recebimentos, Extrato Débitos, Pagamentos e Extrato Créditos'
    };
  }

  getText(rule: PostFormatRule) {
    const text = `Se ${Rule.getFieldName(rule.campo)} ${this.getCondition(rule.condicao)} ${rule.valor}`;
    return StringCutterUtils.cut(text, 60);
  }

  getCondition(condition: number) {
    return 'contém';
  }

  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }

  delete(id: number) {
    this.rows.splice(id, 1);
  }

}
