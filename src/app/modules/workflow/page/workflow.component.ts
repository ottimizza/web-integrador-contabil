import { Component, OnInit } from '@angular/core';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { environment } from '@env';
import { Script } from '@shared/models/Script';
import { PageInfo, GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Lancamento } from '@shared/models/Lancamento';
import { LancamentoService } from '@shared/services/lancamento.service';
import { ColumnDefinition } from '@shared/components/async-table/models/ColumnDefinition';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

  columnDefinition: ColumnDefinition<Lancamento>[] = [
    ColumnDefinition.default('portador', 'Banco'),
    ColumnDefinition.default('descricao', 'Fornecedor / Cliente'),
    {
      header: 'Valor',
      id: 'valorOriginal',
      key: 'valorOriginal',
      transform: (valorOriginal: number) => `R$ ${valorOriginal.toFixed(2).replace('.', ',')}`
    },
    {
      header: 'Complemento',
      id: 'complemento01',
      key: 'complemento01',
      transform: (complemento: string) => complemento || 'NÃO POSSUE COMPLEMENTO'
    }
  ];
  isEmpty = false;

  public button: ActionButton = {
    id: 'new-script',
    icon: 'fad fa-file-spreadsheet',
    label: 'Criar Roteiro',
    color: new HexColor(environment.theme.primaryColor)
  };

  constructor(
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit() {
  }

  create() {
  }

  getData = (page: PageEvent) => this.lancamentoService.getLancamentos({ cnpjEmpresa: '12362390000100', cnpjContabilidade: '20000000000000', pageSize: page.pageSize, pageIndex: page.pageIndex, tipoLancamento: 1, tipoMovimento: 'PAG' });

}
