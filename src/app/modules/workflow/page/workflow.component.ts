import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { momentjs } from '@shared/utils/moment';

import { WORKFLOW_COMPLEX_FILTER_OPTIONS } from '../support/complex-filter/workflow-complex-filter';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { CompanyCreateDialogComponent } from '../dialogs/company-create-dialog.component';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { GlobalVariableService } from '@app/services/global-variables.service';
import { BusinessService } from '@shared/services/business.service';
import { WORKFLOW_TUTORIAL } from '../tutorials/workflow.tutorial';
import { SearchCriteria } from '@shared/models/SearchCriteria';
import { DialogService } from '@app/services/dialog.service';
import { WorkflowService } from '@app/http/workflow.service';
import { DocUtils } from '@shared/utils/docs.utils';
import { Empresa } from '@shared/models/Empresa';
import { Script } from '@shared/models/Script';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  append: BreadCrumb;

  columns1: ColumnDefinition<Empresa>[] = [
    ColumnDefinition.defaultWithoutProperty('nome', 'Empresa', val => `${val.codigoERP ? val.codigoERP + ' - ' : ''}${val.razaoSocial}`),
    ColumnDefinition.activeDefault('cnpj', 'CPF ou CNPJ', val => DocUtils.applyMask(val)),
    ColumnDefinition.default('nomeResumido', 'Apelido')
  ];
  columns2: ColumnDefinition<Script>[] = [
    ColumnDefinition.activeDefault('nome', 'Nome', val => val || 'Não definido'),
    ColumnDefinition.activeDefault('tipoRoteiro', 'Tipo', val => {
      switch (val) {
        case 'PAG': return 'Pagamentos';
        case 'REC': return 'Recebimentos';
        default: return 'Não definido';
      }
    }),
    ColumnDefinition.activeDefault('status', 'Situação', status => {
      const script = new Script();
      script.status = status;
      return script.statusDescription();
    }),
    ColumnDefinition.activeDefault('dataAtualizacao', 'Última alteração', val => momentjs(val).format('DD/MM/YYYY'))
  ];

  public timesCalled = 0;
  public reload = false;
  public theresNoProjects = false;

  public currentUser: User;
  public timesLoaded = 0;

  public companyButton: ActionButton[] = [{
    id: 'new-company',
    icon: 'fad fa-building',
    label: 'Nova Empresa'
  }];

  public projectButton: ActionButton[] = [{
    id: 'new-project',
    icon: 'fad fa-file-spreadsheet',
    label: '+ Integração'
  },
  {
    id: 'cancel',
    icon: 'fad fa-times-square',
    label: 'Cancelar',
    color: 'btn-light'
  }];

  public company: Empresa;

  public options = WORKFLOW_COMPLEX_FILTER_OPTIONS;
  public filters: any = {};

  public tutorial = WORKFLOW_TUTORIAL;

  constructor(
    private router: Router,
    private companyService: BusinessService,
    private workflowService: WorkflowService,
    private vars: GlobalVariableService,
    private dialog: DialogService
  ) {}


  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

  create() {
    this.router.navigate(['/dashboard', 'workflow', 'new']);
  }

  public companies$ = (page: PageEvent) => {
    const filter = { accountingId: this.currentUser.organization.id, nomeResumido: '' };
    Object.assign(filter, this.filters);
    Object.assign(filter, SearchCriteria.of(page));
    this.timesCalled++;
    return this.companyService.fetch(filter);
  }

  public projects$ = (page: PageEvent) => {
    return this.workflowService.fetch({
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      cnpjContabilidade: this.currentUser.organization.cnpj,
      cnpjEmpresa: this.company.cnpj
    });
  }

  public onButtonPressed(id: string) {
    if (id === 'new-company') {
      this.openCompanyDialog();
    } else if (id === 'new-project') {
      this.vars.navigateWithData(['/dashboard', 'workflow', 'new'], this.company);
    } else if (id === 'cancel') {
      this.timesCalled = 0;
      this.company = null;
      this.theresNoProjects = false;
    }
  }

  public onRowSelected(event: Empresa /* Empresa | Script */) {
    if (!this.company) {
      this.company = event;
      this.append = { label: `${event.codigoERP ? event.codigoERP + ' - ' : ''}${event.nomeResumido}` } as any;
    } else {
      this.router.navigate(['/dashboard', 'workflow', event.id]);
    }
    this.filters = {};
  }

  public onFilterChanged(newFilter: any) {
    this.filters = newFilter;
    this.reload = !this.reload;
  }

  public openCompanyDialog() {
    this.dialog.open<Empresa>(CompanyCreateDialogComponent).subscribe(result => {
      if (result.cnpj) {
        this.onRowSelected(result);
      }
    });
  }

  public onEmptyState() {
    if (this.timesCalled === 1) {
      this.openCompanyDialog();
    }
  }

}
