import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { ExportConfirmModalComponent } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastService } from '@shared/services/toast.service';
import { Empresa } from '@shared/models/Empresa';
import { ExportService } from '@app/services/export.service';
import { FormattedHistoric } from '@shared/models/Historic';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { HistoricService } from '@shared/services/historic.service';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { DialogService } from '@app/services/dialog.service';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import getTutorial from '../tutorials/historic-list.tutorial';
import { Subscription } from 'rxjs';
import { TutorialService } from '@app/services/tutorial.service';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './historic-list.component.html',
  styleUrls: ['./historic-list.component.scss']
})
export class HistoricListComponent implements OnInit, OnDestroy {

  currentUser: User;
  company: Empresa;

  percentage = 0;

  entryType = 1;

  isExporting = false;
  isFetching = false;

  records: FormattedHistoric[] = [];
  pageInfo = new PageInfo({ pageIndex: -1, hasNext: true });

  append: BreadCrumb;

  public tutorial = getTutorial(User.fromLocalStorage().type === 0);
  public tutorialInitSub: Subscription;
  public tutorialEndedSub: Subscription;

  constructor(
    private toast: ToastService,
    private dialog: DialogService,
    private service: HistoricService,
    private exportService: ExportService,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    this.onTutorial();
  }

  ngOnDestroy(): void {
    this.tutorialInitSub.unsubscribe();
    this.tutorialEndedSub.unsubscribe();
  }

  public onChangeDetected(id: number) {
    const index = this.records.map(hist => hist.id).indexOf(id);
    this.records.splice(index, 1);
    this.toast.show('Histórico excluído com sucesso!', 'success');
  }

  onFilter(event: string) {
    this.company = JSON.parse(event);
    this.reset();
  }

  onTab(event: MatTabChangeEvent) {
    this.entryType = event.index + 1;
    this.reset();
  }

  public reset() {
    this.pageInfo = new PageInfo({ pageIndex: -1, hasNext: true });
    this.records = [];
    this.append = { label: this.entryType === 1 ? 'Pagamentos' : 'Recebimentos', url: '/historicos' };
    this.fetch();
  }

  public buttons(): ActionButton[] {
    if (this.currentUser.type === 0 && this.company && this.records?.length) {
      return [{
        icon: 'fad fa-cloud-upload-alt',
        id: 'crm',
        label: 'Exportar'
      }];
    }
    return null;
  }

  openDialog() {
    if (this.currentUser.type !== 0) {
      return;
    }
    this.dialog.open(ExportConfirmModalComponent, this.company || {})
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
      this.company.cnpj,
      this.currentUser.organization.cnpj,
      this.entryType,
      (done, total) => this.percentage = Math.round(done / total * 100)
    );
    this.percentage = 0;

    this.toast.showSnack('Exportando históricos, isto pode levar algum tempo...');
    await this.exportService.exportAllHistorics(
      this.company.cnpj,
      this.currentUser.organization.cnpj,
      this.entryType,
      (done, total) => this.percentage = Math.round(done / total * 100)
    );
    this.percentage = 0;
    this.toast.hideSnack();
    this.isExporting = false;
  }

  public fetch() {
    this.isFetching = true;
    const filter = { cnpjEmpresa: this.company.cnpj, cnpjContabilidade: this.currentUser.organization.cnpj, tipoLancamento: this.entryType };
    const pageCriteria = { pageIndex: this.pageInfo.pageIndex + 1 };
    Object.assign(filter, pageCriteria);

    this.service.fetch(filter)
    .pipe(finalize(() => this.isFetching = false))
    .subscribe(result => {
      this.records = this.records.concat(result.records);
      this.pageInfo = result.pageInfo;
    });
  }

  public onTutorial() {
    this.tutorialInitSub = this.tutorialService.afterTutorialStarted.subscribe(() => {
      this.records.unshift({
        cnpjContabilidade: this.currentUser.organization.cnpj,
        cnpjEmpresa: this.currentUser.organization.cnpj,
        contaMovimento: '6733',
        dataAtualizacao: null,
        dataCriacao: null,
        id: -10,
        idRoteiro: this.currentUser.email,
        tipoLancamento: 3,
        historico: 'CodigoHistorico:247$ 13221 ${descricao} 312312 ${portador} 63443 ${complemento03} 1264 ${competenciaAnterior} 1265325 ${documento} '
      });
    });
    this.tutorialEndedSub = this.tutorialService.afterTutorialClosed.subscribe(() => {
      this.records = this.records.filter(rec => rec.id > 0);
    });
  }

}
