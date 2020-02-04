export function collectionForUtils(collection: HTMLCollectionOf<Element>, add: boolean, clazz: string) {
  /*
   * Altera a ClassList de um HTMLCollectionOf (que é diferente de um array)
   */

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < collection.length; i++) {
    const el = collection[i];
    if (add) {
      el.classList.add(clazz);
    } else {
      el.classList.remove(clazz);
    }
  }
}
