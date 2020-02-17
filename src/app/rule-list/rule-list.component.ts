import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { RuleCreateFormat } from '@shared/models/Rule';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { TabButton } from '@shared/components/tab/tab.component';
import { Empresa } from '@shared/models/Empresa';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';

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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
          this._openSnack('Regra excluída com sucesso');
        } else {
          this._openSnack('Falha ao excluir regra.');
        }

      });
  }

  onUpdate(event: string) {
    const rule = JSON.parse(event) as CompleteRule;
    const dialogRef = this.dialog.open(RuleEditModalComponent, {
      width: '80%',
      maxWidth: '1300px',
      data: {
        rule
      }
    });

    dialogRef.afterClosed().subscribe((result: CompleteRule) => {
      if (result && result.regras && result.contaMovimento) {
        this._service
          .update(result.id, { regras: result.regras, contaMovimento: result.contaMovimento })
          .subscribe((info: any) => {
            this.rows[this.rows.indexOf(rule)] = info.record;
            this.rows.forEach(regra => {
              if (regra.id === info.record.id) {
                this.rows[this.rows.indexOf(regra)] = info.record;
                this._openSnack('Regra alterada com sucesso!');
              }
            });
          });
      }
    });
  }

  onSearch(event: string) {
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

  onClone(event: { rule: RuleCreateFormat, position: number }) {
    this._service.createRule(event.rule).subscribe(info => {
      // const page = this.page;
      // this.rows = [];
      const regra: CompleteRule = info.record;
      regra.posicao = event.position;
      this._service.move(regra).subscribe(() => {
        this._openSnack('Regra clonada com sucesso!');
        this.rows.push(regra);
        this.rows.sort((a, b) => a.posicao - b.posicao);
      });
    });
  }


  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    const rule = this.rows[event.previousIndex];
    const position = this.rows[event.currentIndex].posicao;
    rule.posicao = position;
    this._service.move(rule).subscribe(info => {
      moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
      this._openSnack('Regra movida com sucesso!');
    });
  }

  upAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    const position = this.rows[0].posicao;
    rule.posicao = position;
    this._service.move(rule).subscribe(() => {
      moveItemInArray(this.rows, previousIndex, 0);
      this._openSnack('Regra movida com sucesso!');
    });
  }

  downAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    const position = this.pageInfo.totalElements;
    rule.posicao = position;
    this._service.move(rule).subscribe(() => {
      // this.rows = [];
      // for (let i = 0; i < this.page; i++) {
      //   this.page = i;
      //   this.nextPage();
      // }
      this.rows.splice(previousIndex, 1);
      if (this.rows.length + 1 === this.pageInfo.totalElements) {
        this.rows.push(rule);
      }
      this._openSnack('Regra movida com sucesso!');
    });
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

  private _openSnack(text: string) {
    this._snackBar.open(text, 'Ok', { duration: 1200 });
  }
}
