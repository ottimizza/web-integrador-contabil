import { GeradorTransacoes } from './gerador-transacoes'
import { Transacao } from '../transacoes/transacao/transacao';

describe('Class: GeradorTransicoes', () => {


    it('Deve retornar 4 transações', () => {
        expect(GeradorTransacoes.arrayAleatorio().length).toBe(4);
    });


})