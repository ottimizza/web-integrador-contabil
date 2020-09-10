import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env';

import { CompanyCreateDialogComponent } from '@modules/workflow/dialogs/company-create-dialog.component';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { BusinessService } from '@shared/services/business.service';
import { SearchCriteria } from '@shared/models/SearchCriteria';
import { refresh, TimeUtils } from '@shared/utils/time.utils';
import { ToastService } from '@shared/services/toast.service';
import { WorkflowService } from '@app/http/workflow.service';
import { DialogService } from '@app/services/dialog.service';
import { Organization } from '@shared/models/Organization';
import { Script } from '@shared/models/Script';
import { PageEvent } from '@angular/material';
import { User } from '@shared/models/User';
import { switchMap } from 'rxjs/operators';
import { Empresa } from '@shared/models/Empresa';

@Component({
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss'],
})
export class ScriptComponent implements OnInit {

  public columns: ColumnDefinition<Organization>[] = [
    ColumnDefinition.default('razaoSocial', 'Nome'),
    ColumnDefinition.default('cnpj', 'CPF / CNPJ'),
  ];

  public breadcrumbAppend = { label: 'Roteiro' };
  public buttons: ActionButton[] = [
    { icon: 'fad fa-plus-square', id: 'new-company', label: 'Nova Empresa', color: new HexColor(environment.theme.primaryColor) },
    { icon: 'fad fa-times-square', id: 'cancel', label: 'Cancelar', color: 'btn-light' }
  ];

  public currentUser: User;

  public reload = false;

  public company: Empresa;
  public type: 'REC' | 'PAG';
  public name: string;

  public selectedIndex = 0;
  public currentScript: Script;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private service: WorkflowService,
    private dialog: DialogService,
    private toast: ToastService,
    private companyService: BusinessService
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
    if (this.routes.snapshot.params.id) {
      this.load();
    }
  }

  load() {
    this.toast.showSnack('Obtendo informações...');
    this.service.getById(this.routes.snapshot.params.id)
    .pipe(switchMap(result => {
      this.currentScript = result.record;
      return this.companyService.getById(this.currentScript.empresaId);
    }))
    .subscribe(result => {
      this.company = result.record;
      this.toast.show('Projeto acessado com sucesso!', 'success');
    });
  }

  async onCompanySelect(event: Empresa) {
    this.company = event;
    await refresh();
    this.selectedIndex = 1;
  }

  navigate(page: number) {
    this.selectedIndex += page;
  }

  async emitFile(file: File) {
    this.toast.showSnack('Enviando arquivo...');
    if (!this.currentScript) {
      const rs = await this.create();
      this.currentScript = rs.record;
    }
    this.service.upload(this.currentScript.id, file).subscribe(resultSet => {
      this.currentScript = resultSet.record;
      this.toast.hideSnack();
    });
  }

  create() {
    const script = Script.firstPart(this.company);
    return this.service.start(script).toPromise();
  }

  getCompanies = (page: PageEvent) => this.companyService.fetch(SearchCriteria.of(page));

}
