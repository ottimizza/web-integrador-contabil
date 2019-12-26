import { GeradorTransacoes } from 'app/fake-api/gerador-transacoes';
import { Transacao } from './transacao';

describe('Class: Transacao', () => {

    let classe: Transacao;

    beforeEach(() => {
        classe = GeradorTransacoes.arrayAleatorio()[0];
    });

    it('Deve permitir apenas um alteração de conta em uma transação', () => {
        classe.conta = 'Uma conta de testes qualquer';
        expect(classe.conta).toBe('Uma conta de testes qualquer');
        classe.conta = 'Lorem ipsum sit dolor amet';
        expect(classe.conta).toBe('Uma conta de testes qualquer');
    });

    it('Deve retornar uma data no padrão dd/mm/aaaa', () => {
        expect(classe.data).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

});
