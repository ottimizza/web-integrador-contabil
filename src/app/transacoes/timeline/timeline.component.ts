import { Component, OnInit, Input } from '@angular/core';
import { Transacao } from '../transacao/transacao';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { LancamentoService } from '@app/services/lancamentos.service';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  business: string;
  report: string;
  inputSelector = true;
  transacoes: Transacao[];
  local: string;
  cuttedLocal: string;
  constructor(
    private router: Router,
    private fake: TransactionService
  ) {}

  ngOnInit(): void {
    this.defineLocalizationText();

    this.fake.getAll().subscribe(transacoes => this.transacoes = transacoes);
  }

  redirect() {
    this.router.navigate(['dashboard', this.transacoes[0].id]);
  }

  openFilterDialog() {
    this.router
      .navigate(['dashboard', 'filter'])
      .then(() => this.inputSelector = true);
  }

  filter() {
    const array: Transacao[] = [];
    this.inputSelector = false;
    this.transacoes.forEach(t => {
      if (t.fornecedor === this.business) {
        array.push(t);
      }
      if (this.business) {
        this.transacoes = array;
      }
    });
  }

  defineBusiness(event: any) {
    this.business = event.target.value;
    this.defineLocalizationText();
  }

  filteredBusiness() {
    const retorno = [];
    const search = '' + this.business;
    this.transacoes.forEach(t => {
      if (t.fornecedor.startsWith(search.toUpperCase())) {
        let valid = true;
        retorno.forEach(r => {
          if (r.fornecedor === t.fornecedor) {
            valid = false;
          }
        });
        if (valid) {
          retorno.push(t);
        }
      }
    });
    return retorno;
  }

  protected defineLocalizationText() {
    if (this.business && this.report) {
      this.local = StringCutterUtils.cut(`/ Empresa / ${this.business} / Relatório / ${this.report}`, 100);
    } else {
      if (this.business) {
        this.local = StringCutterUtils.cut('/ Empresa / ' + this.business, 100);
      } else if (this.report) {
        this.local = StringCutterUtils.cut('/ Relatório / ' + this.report, 100);
      }
    }
  }

}
