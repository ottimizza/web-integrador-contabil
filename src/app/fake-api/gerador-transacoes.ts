import { Transacao } from '../transacoes/transacao/transacao';

export class GeradorTransacoes {
  static transacoes: Transacao[] = [];

  static arrayAleatorio(): Transacao[] {
    if (!this.transacoes.length) {
      for (let i = 0; this.transacoes.length < 4; i++) {
        this.transacoes.push(
          new Transacao(
            Math.round(Math.random() * 100),
            new Date(Math.round(Math.random() * new Date().getTime())),
            parseFloat((Math.random() * 10000).toFixed(2)),
            'Fornecedor Fake',
            '111.222.333-44',
            'Banco do Brasil',
            'Imagine um complemento TOP aqui',
            'Um melhor ainda aqui',
            'Esse também é muito bom',
            'Esse nem tanto',
            'Complemento 5',
            Math.round(Math.random() * 10000).toString(),
            'Arquivo Fake de Testes'
          )
        );
      }
    }

    return this.transacoes;
  }

  static selecionar(id: number) {
    if (this.transacoes.length < 4) {
      this.arrayAleatorio();
    }

    for (const transacao of this.transacoes) {
      if (transacao.id.toString() === id.toString()) {
        return transacao;
      }
    }
  }

  static adicionarConta(id: number, conta: string) {
    this.transacoes.forEach(transacao => {
      if (id === transacao.id) {
        this.transacoes[this.transacoes.indexOf(transacao)].conta = conta;
      }
    });
    return this.selecionar(id);
  }

  static removerTransacao(id: number) {
    for (let i = 0; i < this.transacoes.length; i++) {
      if (this.transacoes[i].id === id) {
        this.transacoes.splice(i, 1);
      }
    }
    return this.transacoes;
  }
}
