import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { RuleCreateFormat, PostFormatRule, Rule, Condicao } from '@shared/models/Rule';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { TabButton } from '@shared/components/tab/tab.component';
import { Empresa } from '@shared/models/Empresa';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';

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

  constructor(private _service: RuleService) { }

  ngOnInit(): void {
  }

  get info() {
    return {
      text1: 'Para filtrar, insira o nome da empresa desejada',
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

  onClick(button: TabButton) {
    this.rows = [];
    this.isSelected = true;
    if (button === TabButton.PAGAMENTO) {
      this.tipoLancamento = 1;
    } else if (button === TabButton.RECEBIMENTO) {
      this.tipoLancamento = 0;
    }
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

  //   const pageCriteria = { pageIndex: this.pageInfo.pageIndex, pageSize: this.pageInfo.pageSize };
  //   const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento: 1, tipoMovimento: this.tipoMovimento, tipoConta: 0};
  //   Object.assign(filter, pageCriteria);

  //   this._lancamentoService.getLancamentos(filter).subscribe(imports => {
  //     this.records = imports.records;
  //     this.pageInfo = imports.pageInfo;

  //     this._remaining();
  //     this.resetErrors();
  //   });
  // }
    const pageCriteria = { pageIndex: this.page };
    const sorting = { sortBy: 'posicao', sortOrder: 'asc' };
    const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento: this.tipoLancamento };
    Object.assign(filter, pageCriteria, sorting);

    this._service.get(filter).subscribe(imports => {
      this.rows = imports.records;
      this.pageInfo = imports.pageInfo;
    });
    this.page++;

  }
}
