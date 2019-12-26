import { StringCutterUtils } from './string-cutter.util';

describe('Utils: StringCutter', () => {

  it('Método cut() deve cortar uma string', () => {
    // tslint:disable-next-line: max-line-length
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere nisi nisl, vehicula lacinia turpis dignissim vitae.';

    const num1 = Math.round(Math.random() * 100);
    expect(StringCutterUtils.cut(text, num1).length).toBe(num1);

    const num2 = Math.round(Math.random() * 100);
    expect(StringCutterUtils.cut(text, num2).length).toBe(num2);

    const num3 = Math.round(Math.random() * 100);
    expect(StringCutterUtils.cut(text, num3).length).toBe(num3);

  });

});
