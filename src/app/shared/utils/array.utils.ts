export type PrimitiveArray = Array<number | string | boolean>;

export class ArrayUtils {

  public static sum(array: any[], arr: any[]) {
    /*
     * Soma dois arrays eliminando os elementos repetidos
     */

    const newArray = array.filter(item => {
      let verify = true;
      arr.forEach(arrItem => {
        if (JSON.stringify(item) === JSON.stringify(arrItem)) {
          verify = false;
        }
      });
      return verify;
    });

    return newArray.concat(arr);
  }

  /**
   * Compara dois arrays
   */
  public static compare(array: any[], arr: any[]) {
    let verify = true;

    if (!array || !arr) {
      verify = false;
    }

    array.forEach((item, index) => {
      if (item !== arr[index]) {
        verify = false;
      }
    });

    return verify;
  }

  public static split(text: string, ...divisors: string[]) {
    /*
     * Realiza um split com mais de um divisor
     */

    let returningArray: string[];

    divisors.forEach((divisor, id) => {
      if (id === 0) {
        returningArray = text.split(divisor);
      } else {
        const memory: string[] = [];
        returningArray.forEach(r => {

          r.split(divisor).forEach(re => {
            memory.push(re);
          });

        });
        returningArray = memory;
      }
    });

    return returningArray.filter(arr => arr !== '');

  }

  /**
   * Realiza um split com mais de um divisor, mantendo este divisor
   */
  public static magicSplit(text: string, ...divisors: string[]) {
    let indexes = text.split('').map((byte, index) => {
      if (divisors.includes(byte)) {
        return index;
      }
    });
    indexes = indexes.filter(oi => (!!oi || oi === 0));
    indexes = this.flat(indexes.map(index => [index, index + 1]));
    indexes.unshift(0);
    indexes = this.preventRepeat<number>(indexes);

    return indexes.map((start, index) => {
      const end = indexes[index + 1] || text.length;
      return text.slice(start, end);
    }).filter(el => el !== '');
  }

  /**
   * @description Verifica se todos os elementos de um array são validos
   * @param array o array que será verificado
   */
  public static verify<T>(array: T[]): boolean {
    return array.filter(item => !item).length === 0;
  }

  static concatDifferentiatingProperty(array1: any[], array2: any[], property: string) {
    /*
     * Concatena dois arrays ignorando elementos que tenham determinada propriedade repetida
     */

    const props = array1.map(arrItem => arrItem[property]);
    array2 = array2.filter(arrItem => !props.includes(arrItem[property]));
    return array1.concat(array2);
  }

  public static async asyncForEach<T>(
    array: T[],
    callbackFn: (value?: T, index?: number, array?: T[]) => Promise<void>
  ) {
    for (let i = 0; i < array.length; i++) {
      await callbackFn(array[i], i, array);
    }
  }

  public static splice(array: any[], start?: number, count?: number) {
    array = !!array ? array : [];
    return array.splice(start, count);
  }

  public static preventRepeat<T>(array: T[]) {
    const items: T[] = [];
    array.forEach(item => {
      if (!items.includes(item)) {
        items.push(item);
      }
    });
    return items;
  }

  /**
   * @description Transforma um array bidimensional em um array plano
   * @param arrays array bidimensional a ser planificado
   * @returns um array plano
   */
  public static flat<T>(arrays: T[][]) {
    const result: T[] = [];
    arrays.forEach(arr => arr.forEach(item => result.push(item)));
    return result;
  }

  /**
   * Compara se dois arrays são iguais mas sem levar a ordem em conta
   */
  public static includes2d(array1: PrimitiveArray, array2: PrimitiveArray) {
    let includes = true;

    array1.forEach(arr => {
      if (!array2.includes(arr)) {
        includes = false;
      }
    });
    array2.forEach(arr => {
      if (!array1.includes(arr)) {
        includes = false;
      }
    });

    return includes;
  }

  public static doubleIncludes(array: string[], value: string, ignoreCase?: boolean) {
    let ok = false;
    for (let item of array) {
      item = ignoreCase ? item.toUpperCase() : item;
      value = ignoreCase ? value.toUpperCase() : value;
      if (item.includes(value)) {
        ok = true;
        break;
      }
    }
    return ok;
  }

  public static package<T>(array: T[], size = 100): T[][] {
    /*
     * Divide um array em vários pacotes
     */
    const packages = [];
    for (let i = 0; i < array.length; i = i + size) {
      packages.push(array.slice(i, i + size));
    }
    return packages;
  }

}
