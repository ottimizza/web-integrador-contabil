import { Component, ViewEncapsulation } from '@angular/core';
import { Empresa } from '@shared/models/Empresa';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { GuidedTour } from '@gobsio/ngx-guided-tour';
import { TUTORIAL } from './tutorial/transaction-list.tutorial';

@Component({
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent {

  public tutorial: GuidedTour = TUTORIAL;

  business: Empresa;
  append: BreadCrumb;

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

  onSelect(event: string) {
    this.append = {
      label: event,
      url: '/'
    };
  }

}
