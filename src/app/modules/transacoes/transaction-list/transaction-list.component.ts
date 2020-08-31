import { Component, OnInit } from '@angular/core';
import { Empresa } from '@shared/models/Empresa';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { GuidedTour, GuidedTourService } from '@gobsio/ngx-guided-tour';
import DASHBOARD_TOUR from '../guided-tour/transacaoes-guided-tour';

@Component({
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  business: Empresa;
  append: BreadCrumb;

  public dashboardTour: GuidedTour = DASHBOARD_TOUR;

  constructor(private guidedTourService: GuidedTourService) {
    setTimeout(() => this.restartTour(), 500);
  }

  public restartTour(): void {
    this.guidedTourService.startTour(this.dashboardTour);
  }

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
