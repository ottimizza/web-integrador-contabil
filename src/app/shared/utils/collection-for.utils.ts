export function collectionForUtils(collection: HTMLCollectionOf<Element>, add: boolean, prop: string) {
    /*
     * Altera a ClassList de um HTMLCollectionOf (que é diferente de um array)
     */

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < collection.length; i++) {
    const el = collection[i];
    if (add) {
      el.classList.add(prop);
    } else {
      el.classList.remove(prop);
    }
  }
}
