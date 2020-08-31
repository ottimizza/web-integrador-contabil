import { Component, OnInit } from '@angular/core';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { environment } from '@env';
import { Script } from '@shared/models/Script';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

  scripts: Script[];

  displayedColumns = ['name', 'cnpj', 'type', 'status'];

  pageInfo = new PageInfo({ pageIndex: 0, pageSize: 5, hasNext: true });

  public button: ActionButton = {
    id: 'new-script',
    icon: 'fad fa-file-spreadsheet',
    label: 'Criar Roteiro',
    color: new HexColor(environment.theme.primaryColor)
  };

  ngOnInit() {
    const map: any = {};
    const script: Script = {
      cnpjContabilidade: '20000000000000',
      cnpjEmpresa: '12362390000100',
      contabilidadeId: 1830,
      empresaId: 100,
      dataAtualizacao: new Date(),
      dataCriacao: new Date(),
      id: Math.round(Math.random() * 1000),
      nome: 'UMA INTEGRAÇÃO',
      urlArquivo: 'https://oic.ottimizza.com.br',
      status: 4,
      tipoRoteiro: 'PAGAMENTOS',
      mapeamento: map
    };
    this.scripts = [script, script, script];
  }

  create() {
  }

  select(scrpt: Script) {
  }

  onPageChange(event: PageEvent) {
  }

}
