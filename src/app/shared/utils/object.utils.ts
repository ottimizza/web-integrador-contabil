export abstract class ObjectUtils {

  /**
   * Compara dois dados, de qualquer tipo
   * @param firstItem Primeiro item a ser comparado
   * @param secondItem Segundo item a ser comparado
   * @param params Caso os itens sejam funções, esses serão os parâmetros passados
   * @param limit Limite de recursões para impedir um loop em objetos autorreferenciáveis (default: 20)
   * @param timesCalled NÃO MEXA AQUI, TIRA A PATA >:(
   */
  public static equals<T>(firstItem: T, secondItem: T, params: any[] = [], limit = 20, timesCalled = 1): boolean {
    if (timesCalled > limit) {
      throw new Error(`ObjectUtils.equals exceded the ${limit} calls limit in its recursion`);
    } else if (firstItem && secondItem && typeof firstItem === 'object' && !Array.isArray(firstItem)) {

      if (Object.keys(firstItem).length !== Object.keys(secondItem).length) {
        return false;
      }
      for (const key of Object.keys(firstItem)) {
        if (!this.equals(firstItem[key], secondItem[key], [], limit, timesCalled + 1)) {
          return false;
        }
      }
      return true;

    } else if (firstItem && secondItem && typeof firstItem === 'object' && Array.isArray(firstItem) && Array.isArray(secondItem)) {

      if (firstItem.length !== secondItem.length) {
        return false;
      }
      for (let i = 0; i < firstItem.length; i++) {
        if (!this.equals(firstItem[i], secondItem[i], [], limit, timesCalled + 1)) {
          return false;
        }
      }
      return true;

    } else if (firstItem && secondItem && typeof firstItem === 'function' && typeof secondItem === 'function') {
      return this.equals(firstItem(...params), secondItem(...params), [], limit, timesCalled + 1);
    } else {
      return firstItem === secondItem;
    }
  }

}
