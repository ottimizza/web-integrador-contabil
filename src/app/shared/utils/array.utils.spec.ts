import { ArrayUtils } from './array.utils';

describe('Utils: Array', () => {

  describe('Méto sum()', () => {

    it('Deve eliminar repetições ao concatenar dois arrays', () => {
      const arr1 = ['a', 'b', 'c', 'd'];
      const arr2 = ['a', 'e', 'd', 'c', 'f'];

      const sum = ArrayUtils.sum(arr1, arr2);
      expect(sum[0]).toBe('a');
      expect(sum[1]).toBe('b');
      expect(sum[2]).toBe('c');
      expect(sum[3]).toBe('d');
      expect(sum[4]).toBe('e');
      expect(sum[5]).toBe('f');
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

});
