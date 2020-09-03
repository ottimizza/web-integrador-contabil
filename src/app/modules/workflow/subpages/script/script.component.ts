import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';

import { CompanyCreateDialogComponent } from '@modules/workflow/dialogs/company-create-dialog.component';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { OrganizationService } from '@app/http/organizations.service';
import { refresh, TimeUtils } from '@shared/utils/time.utils';
import { WorkflowService } from '@app/http/workflow.service';
import { DialogService } from '@app/services/dialog.service';
import { Organization } from '@shared/models/Organization';
import { PageEvent } from '@angular/material';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss'],
})
export class ScriptComponent implements OnInit {

  public columns: ColumnDefinition<Organization>[] = [
    ColumnDefinition.default('name', 'Nome'),
    ColumnDefinition.default('cnpj', 'CPF / CNPJ')
  ];

  public breadcrumbAppend: BreadCrumb = {
    label: 'Roteiro',
    url: '/dashboard/workflow/new'
  };
  public buttons: ActionButton[] = [
    {
      icon: 'fad fa-plus-square',
      id: 'new-company',
      label: 'Nova Empresa',
      color: new HexColor(environment.theme.primaryColor)
    },
    {
      icon: 'fad fa-times-square',
      id: 'cancel',
      label: 'Cancelar',
      color: 'btn-light'
    }
  ];

  public currentUser: User;

  public reload = false;

  public company: Organization;
  public type: 'REC' | 'PAG';
  public spreadsheetUrl: string;
  public name: string;

  public selectedIndex = 0;

  constructor(
    private router: Router,
    private service: WorkflowService,
    private dialog: DialogService,
    private organizationService: OrganizationService
  ) {}

  onClick(id: string) {
    if (id === 'cancel') {
      this.router.navigate(['/workflow']);
    } else {
      this.openCompanyDialog();
    }
  }

  openCompanyDialog() {
    this.dialog.open(CompanyCreateDialogComponent).subscribe(async result => {
      await TimeUtils.sleep(500);
      if (result === 'organization-created') {
        this.reload = !this.reload;
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
  }

  async onCompanySelect(event: Organization) {
    console.log('abc', event);
    this.company = event;
    await refresh();
    this.type = 'PAG';
    this.selectedIndex = 1;
  }

  navigate(page: number) {
    this.selectedIndex += page;
  }

  getCompanies = (page: PageEvent) => {
    const sortInfo = { 'sort.order': 'asc', 'sort.attribute': 'name' };
    const filter = Object.assign({ type: 2 }, sortInfo);
    Object.assign(filter, { pageIndex: page.pageIndex, pageSize: page.pageSize });
    return this.organizationService.fetch(filter);
  }

}
