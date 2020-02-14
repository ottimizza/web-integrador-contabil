import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { RuleCreateFormat } from '@shared/models/Rule';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { TabButton } from '@shared/components/tab/tab.component';
import { Empresa } from '@shared/models/Empresa';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit, GenericDragDropList, GenericPagination {

  rows: CompleteRule[] = [];
  business: Empresa;
  hasBusiness = false;
  pageInfo: PageInfo;
  page = 0;
  isSelected = false;
  tipoLancamento: number;

  constructor(
    private _service: RuleService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.rows = [];
  }

  get info() {
    return {
      text1: 'Para filtrar, insira o nome da empresa desejada.',
      text2: 'Selecione entre Recebimentos e Pagamentos.'
    };
  }

  get hasNext() {
    if (!this.pageInfo || this.pageInfo.hasNext) {
      return true;
    } else {
      return false;
    }
  }

  onDelete(event: number) {
    const rule = this.rows[event];
    this._service
      .delete(rule.id)
      .subscribe((info: any) => {
        if (info.message === 'Grupo de Regra removido com sucesso!') {
          this.rows.splice(event, 1);
          this._snackBar.open('Regra excluída com sucesso!', 'Ok', { duration: 1200 });
        } else {
          this._snackBar.open('Falha ao excluir regra.', 'Ok', { duration: 1200 });
        }

      });
  }

  onClick(button: TabButton) {
    this.rows = [];
    this.isSelected = true;
    if (button === TabButton.PAGAMENTO) {
      this.tipoLancamento = 1;
    } else if (button === TabButton.RECEBIMENTO) {
      this.tipoLancamento = 2;
    }
    this.page = 0;
    this.nextPage();
  }

  onFilter(event: string) {
    this.hasBusiness = true;
    this.business = JSON.parse(event);
  }

  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }

  upAll(previousIndex: number) {
    moveItemInArray(this.rows, previousIndex, 0);
  }

  downAll(previousIndex: number) {
    moveItemInArray(this.rows, previousIndex, this.rows.length - 1);
  }

  delete(id: number) {
    this.rows.splice(id, 1);
  }

  nextPage() {

    const pageCriteria = { pageIndex: this.page };
    const sorting = { sortBy: 'posicao', sortOrder: 'asc' };
    const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento: this.tipoLancamento };
    Object.assign(filter, pageCriteria, sorting);

    this._service.get(filter).subscribe(imports => {
      imports.records.forEach(rec => this.rows.push(rec));
      this.pageInfo = imports.pageInfo;
    });
    this.page++;
  }
}
