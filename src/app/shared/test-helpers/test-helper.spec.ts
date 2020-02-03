import { TestHelper } from './test-helpers';

describe('Test Helper', () => {

  describe('Método ipsum()', () => {

    it('Deve retornar um texto do tamanho indicado', () => {
      expect(TestHelper.ipsum(50).length).toBe(50);
    });

    it('Deve retornar o texto por inteiro caso o tamanho indicado seja maior que o do texto', () => {
      const num = Number.MAX_VALUE;
      expect(TestHelper.ipsum(num).length).toBe(703);
    });

  });

});
