import { Component } from '@angular/core';
import { Empresa } from '@shared/models/Empresa';

@Component({
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  business: Empresa;
  tabIsSelected = false;

  get info() {
    return {
      first: 'Para filtrar, insira o nome ou o código ERP da empresa que deseja filtrar.',
      second: 'Agora selecione entre "Pagamentos", "Extrato Débitos", "Recebimentos" ou "Extrato Créditos"'
    };
  }

  onDevolve(event: any) {
    this.business = JSON.parse(event);
  }

  onSelect(event: any) {
    if (event === 'true') {
      this.tabIsSelected = true;
    }
  }

}
