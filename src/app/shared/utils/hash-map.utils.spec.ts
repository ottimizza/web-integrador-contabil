import { HashMapUtils } from './hash-map.utils';

describe('Utils: Hash Map', () => {

  describe('método setItem()', () => {

    let key: string;

    afterEach(() => {
      HashMapUtils.removeItem(key);
    });

    it('Deve ser um void quando a key for informada', () => {
      const a = () => {};
      expect(typeof HashMapUtils.setItem(1, '1')).toBe(typeof a);
      key = '1';
    });

    it('Deve retornar a key gerada quando ela não for informada', () => {
      const KEY = HashMapUtils.setItem(1);
      expect(typeof KEY).toBe(typeof '');
      key = KEY;
    });

  });

});
