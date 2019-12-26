import { Transacao } from '../transacoes/transacao/transacao';

export class TestHelper {

    static randomTransaction(){

        return new Transacao(
            Math.round(Math.random() * 100),
            new Date(Math.round(Math.random() * 1575913620161)),
            parseFloat((Math.random() * 10000).toFixed(2)),
            'Fornecedor Fake',
            '111.222.333-44',
            'Banco do Brasil',
            'Lorem ipsum.'
        );

    }

}