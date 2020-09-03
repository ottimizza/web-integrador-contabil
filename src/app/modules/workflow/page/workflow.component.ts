import { Component, OnInit } from '@angular/core';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { environment } from '@env';
import { PageEvent } from '@angular/material';
import { Lancamento } from '@shared/models/Lancamento';
import { LancamentoService } from '@shared/services/lancamento.service';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';
import { Router } from '@angular/router';
import { WorkflowService } from '@app/http/workflow.service';
import { User } from '@shared/models/User';
import { ScriptStatus, Script } from '@shared/models/Script';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

  columnDefinition: ColumnDefinition<Script>[] = [
    ColumnDefinition.default('nome', 'Nome'),
    ColumnDefinition.activeDefault('tipoRoteiro', 'Tipo', (tipoRoteiro => {
      switch (tipoRoteiro) {
        case 'PAG': return 'PAGAMENTOS';
        case 'REC': return 'RECEBIMENTOS';
      }
    })),
    ColumnDefinition.activeDefault('status', 'Status', (status => {
      const script = new Script();
      script.status = status;
      return script.statusDescription();
    })),
  ];
  isEmpty = false;

  currentUser: User;

  public button: ActionButton = {
    id: 'new-script',
    icon: 'fad fa-file-spreadsheet',
    label: 'Criar Roteiro',
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

  getData = (page: PageEvent) =>
    this.service.fetch({ cnpjContabilidade: this.currentUser.organization.cnpj, pageIndex: page.pageIndex, pageSize: page.pageSize })

}
