import { Component, OnInit } from '@angular/core';
import { Empresa } from '@shared/models/Empresa';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { GuidedTour, GuidedTourService } from '@gobsio/ngx-guided-tour';
import getTutorial from './tutorial/transaction-list.tutorial';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  public tutorial: GuidedTour = getTutorial(User.fromLocalStorage().type === 0);

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
