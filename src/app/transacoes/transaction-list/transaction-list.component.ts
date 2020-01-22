import { Component } from '@angular/core';
import { Empresa } from '@shared/models/Empresa';

@Component({
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  business: Empresa;

  get info() {
    return `Filtre por uma empresa, clique nas palavras que indicam o motivo da movimentação ser ignorada ou atribuída a uma determinada conta contábil.
      Depois informe a conta ou selecione uma das sugeridas, ou informe que esta regra deve ser ignorada.`;
  }

  onDevolve(event: any) {
    this.business = JSON.parse(event);
  }

}
