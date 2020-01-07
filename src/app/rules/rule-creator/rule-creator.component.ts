import { Component, Inject, OnInit } from '@angular/core';
import { Transacao } from 'app/transacoes/transacao/transacao';
import { TransactionService } from 'app/transacoes/transaction.service';

@Component({
  templateUrl: './rule-creator.component.html',
  styleUrls: ['rule-creator.component.scss']
})
export class RuleCreatorComponent implements OnInit {

  transaction: Transacao;
  rules: any[] = [];
  conta: string;
  conditions: any[] = [];

  // tslint:disable-next-line: variable-name
  constructor(private _fake: TransactionService) {}

  ngOnInit(): void {
    this._fake.getAll().subscribe(transactions => this.transaction = transactions[0]);
  }

  save() {
    console.log(this.conditions);
    console.log(this.conta);
    this.conta = null;
    this.clear();
  }

  clear() {
    this.rules = [];
    this.conditions = [];
  }

  onClose(event: any) {
    this.rules.splice(event, 1);
  }

  onSelect(event: any) {
    // this.conditions.push(`${event.name} / ${event.condition} / ${event.value}`);
    this.conditions.push(event);
  }

  onDevolve(event: any) {
    this.rules.push(event);
  }

}
