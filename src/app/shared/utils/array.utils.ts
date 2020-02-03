export class ArrayUtils {

  public static sum(array1: any[], array2: any[]) {
    /*
    ! MÉTODO EM MANUTENÇAÕ, EVITAR SEU USO.
    TODO: Consertar o método pra ontem
    Soma dois arrays eliminando os elementos repetidos
     */
    const array = array1;
    const arr = array2.filter(item => array.includes(item));

    arr.forEach(item => {
      array.push(item);
    });

    return array;
    // array.forEach(arrayItem => {
    //   arr.forEach(arrItem => {
    //     if (arrayItem !== arrItem) {
    //       arr.splice(arr.indexOf(arrItem), 1);
    //     }
    //   });
    // });

    // return array.concat(arr);
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
    return returningArray;

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
