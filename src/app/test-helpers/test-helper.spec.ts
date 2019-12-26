import { TestHelper } from './test-helpers'
import { Transacao } from '../transacoes/transacao/transacao'

describe('Class: TestHelper', () => {

    it('método randomTransaction deve retornar uma transação', () => {
        expect(TestHelper.randomTransaction() instanceof Transacao).toBeTruthy();
    });

})