import { count } from 'rxjs/operators';

export class ArrayUtils {

  public static sum(array: any[], arr: any[]) {
    /*
    * Soma dois arrays eliminando os elementos repetidos
    */

    if (typeof array !== typeof arr) {
      throw new Error('Os dois arrays passados para o método ArrayUtils.sum() são de tipos diferentes');
    }

    array.forEach(arrayItem => {
      arr.forEach(arrItem => {
        if (arrayItem === arrItem) {
          arr.splice(arr.indexOf(arrItem), 1);
        }
      });
    });

    return array.concat(arr);
  }


  public static compare(array: any[], arr: any[]) {
    /*
    * Verifica se dois arrays são EXATAMENTE iguais em TODOS os aspectos
    */

    if (!array) {
      return false;
    }
    if (array.length !== arr.length) {
      return false;
    }
    array.forEach(arrayItem => {
      if (arr[array.indexOf(arrayItem)] !== arrayItem) {
        return false;
      }
    });
    return true;

  }

  public static split(text: string, divisors: string[]) {
    /*
    * Realiza um split com mais de um divisor
    */

    let returningArray: string[];

    divisors.forEach(divisor => {
      if (divisors.indexOf(divisor) === 0) {
        returningArray = text.split(divisor);
      } else {
        const counting: string[] = [];
        returningArray.forEach(r => {

          r.split(divisor).forEach(re => {
            counting.push(re);
          });

        });
        returningArray = counting;
      }
    });
    return returningArray;

  }

  public static verify(array: boolean[]): boolean {

    let verify = true;
    array.forEach(arr => {
      if (!arr) {
        verify = false;
      }
    });
    return verify;

  }

}
