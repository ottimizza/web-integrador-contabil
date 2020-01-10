import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transacao } from '../transacao/transacao';
import { TransactionService } from '../transaction.service';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  static initialArraySize: number;

  business: string;
  report: string;
  inputSelector = true;
  transacoes: Transacao[] = [];
  local: string;
  cuttedLocal: string;
  ias: number;
  constructor(
    public router: Router,
    private fake: TransactionService
  ) {}

  ngOnInit(): void {
    this._subiscribe();
    this.router.events.subscribe(() => {
      this._subiscribe();
    });
    this.defineLocalizationText();
    TimelineComponent.initialArraySize = this.transacoes.length;
  }

  private _subiscribe() {
    this.fake.getAll().subscribe(transacoes => {
      if (this.business) {
        this.transacoes = transacoes.filter(transacao => transacao.fornecedor == this.business);
      } else {
        this.transacoes = transacoes;
      }
    }).unsubscribe();
  }

  redirect(): void {
    this.router.navigate(['dashboard', this.transacoes[0].id]);
  }

  openFilterDialog(): void {
    this.router
      .navigate(['dashboard', 'filter'])
      .then(() => this.inputSelector = true);
  }

  filter(): void {
    this._subiscribe();
    this.inputSelector = false;
    this.router.navigate(['dashboard', this.transacoes[0].id]);
  }

  defineBusiness(event: any): void {
    this.business = event.target.value;
    this.defineLocalizationText();
  }

  filteredBusiness(): Transacao[] {
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

  get percentage(): number {
    this.ias = TimelineComponent.initialArraySize;
    return ((this.ias - this.transacoes.length) / this.ias) * 100;
  }

  protected defineLocalizationText(): void {
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
