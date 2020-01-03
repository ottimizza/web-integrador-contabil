import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transacao } from '../transacao/transacao';

@Component({
  selector: 'ott-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transacao: Transacao;
  id: number;
  conta: string;

  constructor(
    private _transactionService: TransactionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      this.id = this._route.snapshot.params.transactionId;

      this.transacao = this._transactionService.getById(this.id);
    });
  }


  fornecedor() {
    this._naoSeEsqueceDeApagar();
  }

  outras() {
    this._naoSeEsqueceDeApagar();
  }

  ignorar() {
    this._transactionService.update(this.id, 'IGNORAR');
    this._excluir();
    this.conta = null;
  }

  pular() {
    this._excluir();
    this.conta = null;
  }

  private _excluir() {
    const array = this._transactionService.remove(parseInt(this.id.toString()));

    this._router.navigate(['dashboard', array.length ? array[0].id : 'index']);
  }

  // TEMPORARIO
  private _naoSeEsqueceDeApagar() {
    if (this.conta) {
      this._transactionService.update(this.id, this.conta);
      this._excluir();
      this.conta = null;
    }
  }
}
