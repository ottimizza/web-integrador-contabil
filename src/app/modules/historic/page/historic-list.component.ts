import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { ActionButton } from '@shared/components/button/button.component';
import { ExportConfirmModalComponent } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.component';
import { Organization } from '@shared/models/Organization';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { ToastService } from '@shared/services/toast.service';
import { Empresa } from '@shared/models/Empresa';
import { ExportService } from '@app/services/export.service';
import { FormattedHistoric } from '@shared/models/Historic';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { HistoricService } from '@shared/services/historic.service';

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
  pageInfo = new PageInfo({ pageIndex: 0, hasNext: true });

  constructor(
    private toast: ToastService,
    private dialog: MatDialog,
    private service: HistoricService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
  }

  onFilter(event: string) {
    this.company = JSON.parse(event);
  }

  onTab(event: MatTabChangeEvent) {
    this.entryType = event.index + 1;
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
    const dialogRef = this.dialog.open(ExportConfirmModalComponent, {
      data: this.company || {},
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
