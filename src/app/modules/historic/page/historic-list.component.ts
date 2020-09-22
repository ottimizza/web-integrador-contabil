import { Component, OnInit } from '@angular/core';
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

@Component({
  templateUrl: './historic-list.component.html',
  styleUrls: ['./historic-list.component.scss']
})
export class HistoricListComponent implements OnInit {

  currentUser: User;
  company: Empresa;

  percentage = 0;

  entryType = 1;

  isExporting = false;

  records: FormattedHistoric[] = [];
  pageInfo = new PageInfo({ pageIndex: -1, hasNext: true });

  append: BreadCrumb;

  constructor(
    private toast: ToastService,
    private dialog: DialogService,
    private service: HistoricService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
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
    const filter = { cnpjEmpresa: this.company.cnpj, cnpjContabilidade: this.currentUser.organization.cnpj, tipoLancamento: this.entryType };
    const pageCriteria = { pageIndex: this.pageInfo.pageIndex + 1 };
    Object.assign(filter, pageCriteria);

    this.service.fetch(filter).subscribe(result => {
      this.records = this.records.concat(result.records);
      this.pageInfo = result.pageInfo;
    });
  }

}
