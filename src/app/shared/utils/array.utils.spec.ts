import { ArrayUtils } from './array.utils';

describe('Utils: Array', () => {

  describe('Méto sum()', () => {

    it('Deve eliminar repetições ao concatenar dois arrays', () => {
      const arr1 = ['a', 'b', 'c', 'd'];
      const arr2 = ['a', 'e', 'd', 'c', 'f'];

      const sum = ArrayUtils.sum(arr1, arr2);
      expect(sum.includes('a')).toBeTruthy();
      expect(sum.includes('b')).toBeTruthy();
      expect(sum.includes('c')).toBeTruthy();
      expect(sum.includes('d')).toBeTruthy();
      expect(sum.includes('e')).toBeTruthy();
      expect(sum.includes('f')).toBeTruthy();
      expect(sum.length).toBe(6);
      // expect(true).toBeTruthy();
    });

  });

  describe('Método compare()', () => {

    it('Deve retornar true se os dois arrays forem exatamente iguais', () => {

      const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

      expect(ArrayUtils.compare(arr1, arr2)).toBeTruthy();

    });

    it('Deve retornar false se os dois arrays não forem exatamente iguais', () => {

      const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      const arr2 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

      expect(ArrayUtils.compare(arr1, arr2)).toBeFalsy();

    });

  });

  describe('Método split()', () => {

    it('Deve realizar um split normal quando houver apenas um divisor', () => {
      const text = '03/02/2020';
      const split = ArrayUtils.split(text, '/');
      expect(ArrayUtils.compare(split, ['03', '02', '2020'])).toBeTruthy();
    });

    it('Deve realizar splits consecutivos quando houver mais de um divisor', () => {
      const cpf = '68.621.197/0001-10';
      const split = ArrayUtils.split(cpf, '.', '/', '-');
      expect(ArrayUtils.compare(split, ['68', '621', '197', '0001', '10'])).toBeTruthy();
    });

  });

  describe('Médoto verify()', () => {

    let array: boolean[];

    beforeEach(() => {
      array = [];
      const times = Math.round(Math.random() * 300);
      for (let i = 0; i < times; i++) {
        array.push(true);
      }
    });

    it('Deve retornar true quando todos os elementos do array forem true', () => {
      expect(ArrayUtils.verify(array)).toBeTruthy();
    });

    it('Deve retornar false quando ao menos um dos elementos do array forem false', () => {
      array.push(false);
      expect(ArrayUtils.verify(array)).toBeFalsy();
    });

  });

});
