import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { GenericDragDropList } from '@shared/interfaces/GenericDragDropList';
import { ActionButton } from '@shared/components/button/button.component';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { RuleCreateFormat } from '@shared/models/Rule';
import { Empresa } from '@shared/models/Empresa';
import { User } from '@shared/models/User';
import { DOCUMENT } from '@angular/common';
import { finalize, catchError } from 'rxjs/operators';
import { ExportService } from '@app/services/export.service';

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
  isExporting: boolean;
  isFetching = false;
  currentUser: User;

  percentage: number;

  constructor(
    @Inject(DOCUMENT) public doc: Document,
    private service: RuleService,
    private toast: ToastService,
    public dialog: MatDialog,
    public exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
  }

  buttons() {
    if (this.currentUser?.type === 0 && this.business && this.rows?.length) {
      return [{
        icon: 'fad fa-cloud-upload-alt',
        id: 'crm',
        label: 'Exportar'
      }];
    }
    return undefined;
  }

  get info() {
    return {
      text1: 'Para filtrar, insira o nome da empresa desejada.',
      text2: 'Selecione entre Recebimentos e Pagamentos.',
      crm: 'Exportar para o CRM'
    };
  }

  get hasNext() {
    return !this.pageInfo || this.pageInfo.hasNext;
  }

  onDelete(event: number) {
    const rule = this.rows[event];
    this.service.delete(rule.id).subscribe(
      (info: any) => {
        if (info.message === 'Grupo de Regra removido com sucesso!') {
          this.rows.splice(event, 1);
          this.toast.show('Regra excluída com sucesso', 'success');
        } else {
          this.toast.show('Falha ao excluir regra.', 'danger');
        }
      });
  }

  onUpdate(event: string) {
    const rule = JSON.parse(event) as CompleteRule;
    const dialogRef = this.dialog.open(RuleEditModalComponent, {
      width: '84%',
      maxWidth: '1300px',
      data: {
        rule
      }
    });

    dialogRef.afterClosed().subscribe((result: CompleteRule) => {
      if (result && result.regras && result.contaMovimento) {
        this.service
          .update(result.id, { regras: result.regras, contaMovimento: result.contaMovimento })
          .subscribe((info: any) => {
              this.rows[this.rows.indexOf(rule)] = info.record;

              this.rows.forEach(regra => {
                if (regra.id === info.record.id) {
                  this.rows[this.rows.indexOf(regra)] = info.record;
                  this.toast.show('Regra alterada com sucesso!', 'success');
                }
              });
            });
      }
    });
  }

  openConfirmation() {
    if (this.currentUser.type !== 0) {
      return;
    }
    const dialogRef = this.dialog.open(ExportConfirmModalComponent, {
      data: this.business,
      maxWidth: '596px'
    });

    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this.export();
      } else {
        this.toast.show('Exportação cancelada', 'warning');
      }
    });
  }

  async export() {

    this.isExporting = true;

    this.toast.showSnack('Exportando regras, isto pode levar algum tempo...');
    await this.exportService.exportAllRules(
      this.business.cnpj,
      this.currentUser.organization.cnpj,
      this.tipoLancamento,
      (done, total) => this.percentage = Math.round(done / total * 100)
    );
    this.percentage = 0;

    this.toast.showSnack('Exportando históricos, isto pode levar algum tempo...');
    await this.exportService.exportAllHistorics(
      this.business.cnpj,
      this.currentUser.organization.cnpj,
      this.tipoLancamento,
      (done, total) => this.percentage = Math.round(done / total * 100)
    );
    this.percentage = 0;
    this.toast.hideSnack();

    this.isExporting = false;
  }

  exportRule(id: number) {
    return this.service.exportById(id)
      .pipe(catchError(() => {
        this.isExporting = false;
        return null;
      })).toPromise();
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

  async onClone(event: { rule: RuleCreateFormat; position: number }) {
    const rs = await this.service.createRule(event.rule).toPromise();
    const rule: CompleteRule = rs.record;
    rule.posicao = event.position;

    await this.service.changePosition(rule).toPromise();
    this.rows.push(rule);
    this.rows.sort((a, b) => a.posicao - b.posicao);
    this.artificialClone = rule;
    this.toast.show('Regra clonada com sucesso!', 'success');
  }

  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const rule = this.rows[event.previousIndex];
      const position = this.rows[event.currentIndex].posicao;
      rule.posicao = position;
      this.service.changePosition(rule).subscribe(
        info => {
          moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
          this.toast.show('Regra movida com sucesso!', 'success');
        });
    }
  }

  upAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    this.service.moveToTop(rule.id).subscribe(() => {
      moveItemInArray(this.rows, previousIndex, 0);
      this.toast.show('Regra movida com sucesso!', 'success');
    });
  }

  downAll(previousIndex: number) {
    const rule = this.rows[previousIndex];
    this.service.moveToBottom(rule.id).subscribe(() => {
        if (this.rows.length === this.pageInfo.totalElements || this.rows.length < this.pageInfo.pageSize) {
          this.rows.push(rule);
        }
        this.rows.splice(previousIndex, 1);
        this.toast.show('Regra movida com sucesso!', 'success');
      });
  }

  load() {
    const pageCriteria = { pageIndex: this.page };
    const sorting = { sortBy: 'posicao', sortOrder: 'asc' };
    const filter = {
      cnpjEmpresa: this.business.cnpj,
      tipoLancamento: this.tipoLancamento
    };
    Object.assign(filter, pageCriteria, sorting);

    this.isFetching = true;
    return this.service.get(filter)
      .pipe(finalize(() => this.isFetching = false))
      .toPromise();
  }

  async nextPage() {
    this.toast.showSnack('Aguardando resposta...');

    const rs = await this.load();
    this.page++;

    this.removeClone();

    this.rows = this.rows.concat(rs.records);
    this.pageInfo = rs.pageInfo;

    this.toast.hideSnack();
  }

  removeClone() {
    const props1 = Object.values(this.artificialClone || {});
    const props2 = Object.values(this.rows[this.rows.length - 1] || {});
    const differentProperties = props1.filter(val => !props2.includes(val));

    if (differentProperties.length === 0) {
      this.rows.splice(this.rows.length - 1, 1);
      this.artificialClone = null;
    }
  }

  onScroll(event: boolean) {
    if (event && this.pageInfo.hasNext && !this.isFetching) {
      this.nextPage();
    }
  }

  smallSize() {
    const width = window.innerWidth ?? this.doc.documentElement.clientWidth ?? this.doc.body.clientWidth;
    return width < 968;
  }

}
