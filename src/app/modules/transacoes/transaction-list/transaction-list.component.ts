import { Component, OnInit } from '@angular/core';
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
      first: 'Para filtrar, insira o nome da empresa desejada',
      second: 'Agora selecione entre "Pagamentos", "Extrato Débitos", "Recebimentos" ou "Extrato Créditos"'
    };
  }

  async onDevolve(event: string) {
    this.business = null;
    await new Promise(resolve => setTimeout(resolve, 200));
    this.business = JSON.parse(event);
  }

  onSelect(event: any) {
    if (event === 'true') {
      this.tabIsSelected = true;
    }
  }

}
