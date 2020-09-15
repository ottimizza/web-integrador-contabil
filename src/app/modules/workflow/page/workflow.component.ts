import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';

import { PageEvent } from '@angular/material';

import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { SearchCriteria } from '@shared/models/SearchCriteria';
import { WorkflowService } from '@app/http/workflow.service';
import { Script } from '@shared/models/Script';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

  columnDefinition: ColumnDefinition<Script & { nomeEmpresa: string, erpEmpresa: string }>[] = [
    ColumnDefinition.activeDefault('nome', 'Nome', val => val || 'Não definido'),
    ColumnDefinition.activeDefault('tipoRoteiro', 'Tipo', (tipoRoteiro => {
      switch (tipoRoteiro) {
        case 'PAG': return 'PAGAMENTOS';
        case 'REC': return 'RECEBIMENTOS';
        default:    return 'Não definido';
      }
    })),
    ColumnDefinition.activeDefault('status', 'Status', (status => {
      const script = new Script();
      script.status = status;
      return script.statusDescription();
    })),
    ColumnDefinition.default('nomeEmpresa', 'Empresa')
  ];
  isEmpty = false;

  currentUser: User;

  public button: ActionButton = {
    id: 'new-script',
    icon: 'fad fa-file-spreadsheet',
    label: 'Novo Projeto',
    color: new HexColor(environment.theme.primaryColor)
  };

  constructor(
    private router: Router,
    private service: WorkflowService
  ) {}

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

  create() {
    this.router.navigate(['/dashboard', 'workflow', 'new']);
  }

  getData = (page: PageEvent) => {
    const filter = { cnpjContabilidade: this.currentUser.organization.cnpj };
    return this.service.fetchWithCompany(SearchCriteria.of(page).with(filter));
  }

  public onRowSelected(event: Script) {
    this.router.navigate(['/dashboard', 'workflow', event.id]);
  }

}
