import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { RuleDeleteConfirmDialogComponent } from './rule-delete-confirm-dialog/rule-delete-confirm-dialog.component';
import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { DialogService, DialogWidth } from '@app/services/dialog.service';
import { RuleLogicService } from '@app/services/logic/rule-logic.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { RuleCreateFormat, RuleType } from '@shared/models/Rule';
import { ToastService } from '@shared/services/toast.service';
import { ExportService } from '@app/services/export.service';
import { RuleService } from '@shared/services/rule.service';
import { CompleteRule } from '@shared/models/CompleteRule';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Empresa } from '@shared/models/Empresa';
import { User } from '@shared/models/User';
import { TutorialService } from '@app/services/tutorial.service';
import { momentjs } from '@shared/utils/moment';
import getTutorial from './guided-tour/rule-list.tutorial';
import { Subscription } from 'rxjs';
import { BeforeComponentDestroyed } from '@shared/operators/before-component-destroyed.operator';

@Component({
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent extends BeforeComponentDestroyed implements OnInit {

  rows: CompleteRule[] = [];
  business: Empresa;
  pageInfo: PageInfo;
  page = 0;
  tabIsSelected = false;
  tipoLancamento = 1;
  isExporting: boolean;
  isFetching = false;
  currentUser: User;

  percentage: number;

  append: BreadCrumb;
  tutorial = getTutorial(User.fromLocalStorage().type === 0);
  tabWasSelected: boolean;
  oldCompany: Empresa;

  constructor(
    @Inject(DOCUMENT) public doc: Document,
    public dialog: DialogService,
    private service: RuleService,
    private toast: ToastService,
    public exportService: ExportService,
    public logicService: RuleLogicService,
    private tutorialService: TutorialService
  ) {
    super();
  }

ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    this.prepareTutorial();
  }

  async onButton(id: string) {
    if (id === 'refresh') {
      this.page = 0;
      this.toast.showSnack('Atualizando...');
      const rs = await this.load();
      this.pageInfo = rs.pageInfo;
      this.page++;
      this.rows = rs.records;
      this.toast.hideSnack();
    } else {
      this.openConfirmation();
    }
  }

  buttons() {
    const btn: ActionButton = {
      icon: 'fad fa-sync',
      id: 'refresh',
      label: 'Atualizar',
      color: 'btn-light'
    };
    if (this.rows?.length) {
      if (this.currentUser?.type === 0) {
      return [{
        icon: 'fad fa-cloud-upload-alt',
        id: 'crm',
        label: 'Exportar'
      }].concat(btn);
      }
      return [btn];
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
    this.dialog.open(RuleDeleteConfirmDialogComponent, {
      id: rule.id,
      type: RuleType.RULE
    }).subscribe(result => {
      if (result === true) {
        this.rows = this.logicService.delete(this.rows, event);
        this.toast.show('Regra alterada com sucesso, recomendamos clicar em "Atualizar"', 'success');
      }
    });
  }

  async onUpdate(event: string) {
    const rule = JSON.parse(event) as CompleteRule;
    this.dialog.openComplexDialog(RuleEditModalComponent, DialogWidth.EXTRA_LARGE, { rule })
    .subscribe(async (result: CompleteRule) => {
      if (result && result.regras && result.contaMovimento) {
        const rs = await this.service.update(result.id, { regras: result.regras, contaMovimento: result.contaMovimento }).toPromise();
        this.rows[this.rows.indexOf(rule)] = rs.record;

        this.rows.forEach(rl => {
          if (rl.id === rs.record.id) {
            this.rows[this.rows.indexOf(rl)] = rs.record;
            this.toast.show('Regra alterada com sucesso, recomendamos clicar em "Atualizar"', 'success');
          }
        });
      }
    });
  }

  openConfirmation() {
    if (this.currentUser.type !== 0) {
      return;
    }
    this.dialog.open(ExportConfirmModalComponent, this.business || {})
    .subscribe(results => {
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
    this.append = { label: this.tipoLancamento === 1 ? 'Pagamentos' : 'Recebimentos', url: '/regras' };
    this.nextPage();
  }

  onFilter(event: string) {
    this.business = JSON.parse(event);
    this.onTab({ tab: null, index: this.tipoLancamento - 1 });
  }

  async onClone(event: CompleteRule) {
    this.rows = await this.logicService.clone(event.id, this.rows);
  }

  drop(event: CdkDragDrop<RuleCreateFormat[]>) {
    this.rows = this.logicService.reorder(this.rows, event.previousIndex, event.currentIndex);
  }

  load() {
    const pageCriteria = { pageIndex: this.page };
    const sorting = { sortBy: 'posicao', sortOrder: 'asc' };
    const filter = {
      cnpjEmpresa: this.business.cnpj,
      cnpjContabilidade: this.currentUser.organization.cnpj,
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

    this.rows = ArrayUtils.concatDifferentiatingProperty(this.rows, rs.records, 'id');
    this.pageInfo = rs.pageInfo;

    this.toast.hideSnack();
  }

  onScroll() {
    if (this.pageInfo.hasNext && !this.isFetching) {
      this.nextPage();
    }
  }

  smallSize() {
    const width = window.innerWidth ?? this.doc.documentElement.clientWidth ?? this.doc.body.clientWidth;
    return width < 968;
  }

  private prepareTutorial() {
    this.tutorialService.afterTutorialStarted
    .pipe(this.takeUntil)
    .subscribe(() => {
      this.tabWasSelected = this.tabIsSelected;
      this.tabIsSelected = true;
      this.rows.unshift({
        cnpjContabilidade: this.currentUser.organization.cnpj,
        cnpjEmpresa: this.currentUser.organization.cnpj,
        contaMovimento: '4632',
        dataAtualizacao: new Date().toString(),
        dataCriacao: new Date().toString(),
        id: -10,
        idRoteiro: this.currentUser.email,
        posicao: -1,
        tipoLancamento: 3,
        regras: [
          { campo: 'fornecedor', condicao: 1, valor: 'Ferramentas e Autopeças' } as any
        ]
      });
      this.oldCompany = this.business;
      this.business = {} as any;
    });

    this.tutorialService.afterTutorialClosed
    .pipe(this.takeUntil)
    .subscribe(() => {
      this.rows = this.rows.filter(rule => rule.id > 0);
      this.tabIsSelected = this.tabWasSelected;
      this.business = this.oldCompany;
    });
  }

}
