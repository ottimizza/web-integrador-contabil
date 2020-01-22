export class HashMapUtils {

  // tslint:disable-next-line: variable-name
  private static _values: string[][] = [[]];

  public static setItem(item: any, key?: string): string | void {
    if (key) {
      if (this._verifyKey(key)) {
        this._values.push([key, JSON.stringify(item)]);
      } else {
        throw new Error('This HashMapUtils key is already in use');
      }
    } else {
      const newKey = this._newKey;
      this._values.push([newKey, JSON.stringify(item)]);
      return newKey;
    }
  }

  public static getItem(key: string) {
    return JSON.parse(this._getCorrectRow(key)[1]);
  }

  public static removeItem(key: string) {
    this._values.splice(this._values.indexOf(this._getCorrectRow(key)), 1);
  }

  private static _getCorrectRow(key: string) {
    return this._values.filter(row => row[0] === key)[0];
  }

  private static _verifyKey(key: string) {
    this._values.forEach(row => {
      if (row[0] === key) {
        return false;
      }
    });
    return true;
  }

  private static get _newKey() {
    const key = Math.round(Math.random() * 100000).toString();
    if (this._verifyKey(key)) {
      return key;
    } else {
      return this._newKey;
    }
  }

}
