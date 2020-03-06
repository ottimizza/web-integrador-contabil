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

  public static compare(array: any[], arr: any[]) {
    /*
     * Verifica se dois arrays são EXATAMENTE iguais em TODOS os aspectos
     */
    let verify = true;

    if (!array) {
      verify = false;
    }
    if (array.length !== arr.length) {
      verify = false;
    }
    array.forEach(arrayItem => {
      if (arr[array.indexOf(arrayItem)] !== arrayItem) {
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

    return returningArray.filter(arr => arr !== '');

  }

  public static verify(array: boolean[]): boolean {
    /*
     * Verifica se todos os elementos de um array são true
     */

    let verify = true;
    array.forEach(arr => {
      if (arr !== true) {
        verify = false;
      }
    });
    return verify;

  }

}
