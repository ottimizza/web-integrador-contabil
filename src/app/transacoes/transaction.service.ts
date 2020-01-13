import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { GeradorTransacoes } from '../fake-api/gerador-transacoes';
import { Transacao } from './transacao/transacao';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  getAll() {
    return of(GeradorTransacoes.arrayAleatorio());
  }

  getById(id: number) {
    return GeradorTransacoes.selecionar(id);
  }

  remove(id: number) {
    return GeradorTransacoes.removerTransacao(id);
  }
}
