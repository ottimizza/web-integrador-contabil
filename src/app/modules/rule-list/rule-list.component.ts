import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material';

import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { RuleCreateFormat } from '@shared/models/Rule';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { ToastService } from '@shared/services/toast.service';
import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit, GenericDragDropList, GenericPagination {

  rows: CompleteRule[] = [];
  business: Empresa;
  pageInfo: PageInfo;
  page = 0;
  tabIsSelected = false;
  tipoLancamento = 1;
  artificialClone: CompleteRule;

  constructor(
    private _service: RuleService,
    private _snackBar: ToastService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = User.fromLocalStorage();
    if (!user.email.toUpperCase().includes('OTTIMIZZA') && user.type !== 0) {
      this._router.navigate(['/']);
    }
  }

  get info() {
    return {
      text1: 'Para filtrar, insira o nome da empresa desejada.',
      text2: 'Selecione entre Recebimentos e Pagamentos.',
      crm: 'Exportar para o CRM'
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
          this._openSnack('Regra excluída com sucesso', 'success');
        } else {
          this._openSnack('Falha ao excluir regra.', 'danger');
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
                this._openSnack('Regra alterada com sucesso!', 'success');
              }
            });
          });
      }
    });
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(ExportConfirmModalComponent, {
      data: this.business,
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this._openSnack('Método ainda não implementado.', 'warning');
        // this._openSnack('Regras exportadas com sucesso!', 'success');
      } else {
        this._openSnack('Exportação cancelada', 'warning');
      }
    });
  }

  onTab(event: MatTabChangeEvent) {
    this.rows = [];
    this.tabIsSelected = true;
    this.tipoLancamento = event.index + 1;
    this.page = 0;
    this.nextPage();
  }

  onFilter(event: string) {
    this.business = JSON.parse(event);
    this.onTab({ tab: null, index: this.tipoLancamento - 1 });
  }

  onClone(event: { rule: RuleCreateFormat, position: number }) {
    this._service.createRule(event.rule).subscribe(info => {
      // const page = this.page;
      // this.rows = [];
      const regra: CompleteRule = info.record;
      regra.posicao = event.position;
      this._service.changePosition(regra).subscribe(() => {
        this.rows.push(regra);
        this.rows.sort((a, b) => a.posicao - b.posicao);
        this.artificialClone = regra;
        this._openSnack('Regra clonada com sucesso!', 'success');
      });
    });
  }


  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const rule = this.rows[event.previousIndex];
      const position = this.rows[event.currentIndex].posicao;
      rule.posicao = position;
      this._service.changePosition(rule).subscribe(info => {
        moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
        this._openSnack('Regra movida com sucesso!', 'success');
      });
    }
  }

  upAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    this._service.moveToTop(rule.id).subscribe(() => {
      moveItemInArray(this.rows, previousIndex, 0);
      this._openSnack('Regra movida com sucesso!', 'success');
    });
  }

  downAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    this._service.moveToBottom(rule.id).subscribe(() => {

      if (this.rows.length === this.pageInfo.totalElements) {
        this.rows.push(rule);
      }
      this.rows.splice(previousIndex, 1);
      this._openSnack('Regra movida com sucesso!', 'success');
    });
  }

  nextPage() {
    const pageCriteria = { pageIndex: this.page };
    const sorting = { sortBy: 'posicao', sortOrder: 'asc' };
    const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento: this.tipoLancamento };
    Object.assign(filter, pageCriteria, sorting);

    this._snackBar.showSnack('Aguardando resposta');

    this._service.get(filter).subscribe(imports => {

      if (JSON.stringify(this.artificialClone) === JSON.stringify(this.rows[this.rows.length - 1])) {
        /*
        Sempre que uma regra é clonada, o clone é artificialmente inserido no array local para que não seja necessário
        bombardear o servidor com novos requests.
        Esta verificação garante que o último item do array local não seja literalmente uma cópia (cópia !== clone) do primeiro item
        do array do request.
        */
        this.rows.splice(this.rows.length - 1, 1);
        this.artificialClone = null;
      }

      imports.records.forEach(rec => this.rows.push(rec));
      this.pageInfo = imports.pageInfo;
      this._snackBar.hideSnack();
    });
    this.page++;
  }

  onScroll(event: boolean) {
    if (event && this.pageInfo.hasNext) {
      this.nextPage();
    }
  }

  private _openSnack(text: string, color: 'danger' | 'primary' | 'success' | 'warning' = 'success') {
    this._snackBar.show(text, color);
  }


}
