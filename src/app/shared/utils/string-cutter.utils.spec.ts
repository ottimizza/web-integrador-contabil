import { StringCutterUtils } from './string-cutter.util';

describe('Utils: StringCutter', () => {

  describe('Método cut()', () => {

    it('Deve cortar uma string se ela for maior que o indicado', () => {
      // tslint:disable-next-line: max-line-length
      const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere nisi nisl, vehicula lacinia turpis dignissim vitae.';

      const num1 = Math.round(Math.random() * 100);
      expect(StringCutterUtils.cut(text, num1).length).toBe(num1);

      const num2 = Math.round(Math.random() * 100);
      expect(StringCutterUtils.cut(text, num2).length).toBe(num2);

      const num3 = Math.round(Math.random() * 100);
      expect(StringCutterUtils.cut(text, num3).length).toBe(num3);

    });

    it('Não deve cortar uma string se ela for menor que o indicado', () => {

      const text = 'Lorem ipsum dolor sit amet. gbhw9reghbwqeupoghe u qe';
      const cuttedText = StringCutterUtils.cut(text, 100);
      expect(cuttedText.length).toBe(52);
      expect(cuttedText.charAt(cuttedText.length - 1)).not.toEqual('.');

    });

  });



});
