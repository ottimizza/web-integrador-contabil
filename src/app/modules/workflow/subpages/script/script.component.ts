import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { environment } from '@env';

import { PageEvent } from '@angular/material/paginator';

import { SCRIPT_COMPLEX_FILTER_OPTIONS } from '@modules/workflow/support/complex-filter/script-complex-filter';
import { CompanyCreateDialogComponent } from '@modules/workflow/dialogs/company-create-dialog.component';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { SCRIPT_TUTORIAL, setIds } from '@modules/workflow/tutorials/script.tutorial';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { BusinessService } from '@shared/services/business.service';
import { SearchCriteria } from '@shared/models/SearchCriteria';
import { ChecklistService } from '@app/http/checklist.service';
import { refresh, TimeUtils } from '@shared/utils/time.utils';
import { ToastService } from '@shared/services/toast.service';
import { WorkflowService } from '@app/http/workflow.service';
import { DialogService } from '@app/services/dialog.service';
import { LazyLoader } from '@shared/models/LazyLoader';
import { Checklist } from '@shared/models/Checklist';
import { Empresa } from '@shared/models/Empresa';
import { Script } from '@shared/models/Script';
import { User } from '@shared/models/User';
import { GlobalVariableService } from '@app/services/global-variables.service';

@Component({
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss'],
})
export class ScriptComponent implements OnInit, AfterViewInit {

  public columns: ColumnDefinition<Empresa>[] = [
    ColumnDefinition.defaultWithoutProperty('name', 'Nome', company => {
      return `${(company.codigoERP && company.codigoERP !== 'null') ? company.codigoERP + ' - ' : ''}${company.razaoSocial || ''}`.toUpperCase().trim();
    }),
    ColumnDefinition.default('cnpj', 'CPF / CNPJ'),
  ];

  public breadcrumbAppend = { label: 'Roteiro' };
  public buttons: ActionButton[] = [
    { icon: 'fad fa-times-square', id: 'cancel', label: 'Cancelar', color: 'btn-light' }
  ];

  public currentUser: User;

  public reload = false;

  public company: Empresa;

  public selectedIndex = 0;
  public currentScript: Script;

  public type: 'PAG' | 'REC';

  public checklist = new LazyLoader<Checklist>();

  public filterOptions = SCRIPT_COMPLEX_FILTER_OPTIONS;
  public filter: any = {};
  public fakeFilter: SearchOption[];

  public tutorial = SCRIPT_TUTORIAL;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private service: WorkflowService,
    private checklistService: ChecklistService,
    private dialog: DialogService,
    private toast: ToastService,
    private companyService: BusinessService,
    private vars: GlobalVariableService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngAfterViewInit(): void {
    setIds(this.doc);
  }

  onClick(id: string) {
    if (id === 'cancel') {
      this.router.navigate(['/workflow']);
    } else {
      this.openCompanyDialog();
    }
  }

  openCompanyDialog() {
    this.dialog.open<Empresa>(CompanyCreateDialogComponent).subscribe(async result => {
      await TimeUtils.sleep(500);
      if (result.cnpj) {
        this.fakeFilter = [{ description: `CNPJ igual a: ${result.cnpj}`, id: 'cnpj', value: { cnpj: result.cnpj } }];
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    if (this.routes.snapshot.params.id) {
      this.load();
    } else {
      this.company = this.vars.routeData as any;
    }
  }

  public startChecklist() {
    this.checklist.call(this.checklistService.fetch(this.currentScript.tipoProjeto || 1), 'record');
  }

  load() {
    this.toast.showSnack('Obtendo informações...');
    this.service.getById(this.routes.snapshot.params.id)
    .pipe(switchMap(result => {
      this.currentScript = result.record;
      return this.companyService.getById(this.currentScript.empresaId);
    }))
    .subscribe(async result => {
      this.company = result.record;
      let page = 0;
      if (this.currentScript.urlArquivo) {
        page = 1;
      }
      if (this.currentScript.tipoRoteiro) {
        this.startChecklist();
        page = 2;
      }
      if (this.currentScript.checklist) {
        page = 3;
      }
      await refresh();
      this.navigate(page);
      this.toast.show('Projeto acessado com sucesso!', 'success');
    });
  }

  async onChecklistCompleted(event: Script) {
    this.currentScript = event;
    this.currentScript.checklist = true;
    await refresh();
    this.navigate(3);
  }

  navigate(page: number) {
    this.selectedIndex = page;
  }

  async emitFile(file: File) {
    this.toast.showSnack('Enviando arquivo...');
    if (!this.currentScript) {
      const rs = await this.create();
      this.currentScript = rs.record;
    }
    this.service.upload(this.currentScript.id, file, this.company.cnpj, this.currentUser.organization.cnpj, environment.storageApplicationId)
    .subscribe(async resultSet => {
      this.router.navigate(['/dashboard', 'workflow', this.currentScript.id]);
    });
  }

  create() {
    const script = Script.firstPart(this.company);
    return this.service.start(script).toPromise();
  }

  async confirmType() {
    this.toast.showSnack('Definindo tipo...');
    const rs = await this.service.patch(this.currentScript.id, { tipoRoteiro: this.type, status: 5 }).toPromise();
    this.currentScript = rs.record;
    this.startChecklist();
    this.toast.hideSnack();
    await refresh();
    this.selectedIndex = 2;
  }

  public onFilterChanged(event: any) {
    this.filter = event;
    this.reload = !this.reload;
  }

  getCompanies = (page: PageEvent) => this.companyService.fetch(SearchCriteria.of(page).with(this.filter));

}
