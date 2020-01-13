import { TransactionService } from './transaction.service';
import { Transacao } from './transacao/transacao';
import { TestHelper } from '../shared/test-helpers/test-helpers';

describe('Service: Transaction', () => {

    let service: TransactionService;
    let transacaoTeste: Transacao;

    beforeEach(() => {
        service = new TransactionService();
        transacaoTeste = TestHelper.randomTransaction();
    });


    it('Deve retornar um array com quatro transações', () => {
        service
            .getAll()
            .subscribe(array => {
                expect(array.length).toBe(4);
                array.forEach(transacao => expect(typeof transacao).toBe(typeof transacaoTeste));
            });
    });

    it('Deve retornar uma transação', () => {
        const array: number[] = [];

        for (let i = 0; i < 101; i++) {
            if (service.getById(i)) {
              array.push(i);
            }
        }

        expect(typeof service.getById(array[Math.round(Math.random() * 3)])).toBe(typeof transacaoTeste);

    });

    it('Deve remover uma transação', () => {
        let id: number;
        let quant: number;
        service
            .getAll()
            .subscribe(array => {
                id = array[Math.round(Math.random() * 3)].id;
                quant = array.length;
            });

        expect(service.remove(id).length).toBe(quant - 1);
    });

});
