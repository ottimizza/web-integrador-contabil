import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { RuleCreateFormat, PostFormatRule, Rule } from '@shared/models/Rule';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';

@Component({
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit, GenericDragDropList, GenericPagination {

  rows: RuleCreateFormat[] = [];
  hasBusiness = false;
  pageInfo: PageInfo;
  page = 0;

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.rows.push(
        new RuleCreateFormat(
            [
              { campo: 'descricao', condicao: 1, valor: i.toString() },
              { campo: 'complemento01', condicao: 1, valor: 'ATRASADO' },
              { campo: 'complemento02', condicao: 1, valor: 'EXTRA' },
              // { campo: 'complemento03', condicao: 1, valor: 'terceirizado' },
              // { campo: 'nomeArquivo', condicao: 1, valor: 'arquivo3214.xlsx' }
            ],
            'um cnpj bem daora',
            'outro cnpj',
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

  get hasNext() {
    if (!this.pageInfo || this.pageInfo.hasNext) {
      return true;
    } else {
      return false;
    }
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

  nextPage() {

    if (this.hasNext) {
      this.page++;
      for (let i = 0; i < 10; i++) {
        this.rows.push(
          new RuleCreateFormat(
            [
              { campo: 'descricao', condicao: 1, valor: i.toString() },
              { campo: 'complemento01', condicao: 1, valor: 'ATRASADO' },
              { campo: 'complemento02', condicao: 1, valor: 'EXTRA' },
              // { campo: 'complemento03', condicao: 1, valor: 'terceirizado' },
              // { campo: 'nomeArquivo', condicao: 1, valor: 'arquivo3214.xlsx' }
            ],
            'um cnpj bem daora',
            'outro cnpj',
            '1312418921'
          )
        );
      }
    }

  }
}
