export abstract class Pointer {

  private static data: any;

  public static exists(address: string) {
    return this.data[address] && typeof this.data[address] === 'object';
  }

  public static delete(address: string) {
    delete Pointer.data[address];
  }

  public static new<T>(objekt: object & T, addressByteLenght = 8) {
    this._startData();
    const address = this._createAddress(addressByteLenght);

    Pointer.data[address] = objekt;
    const classess: any[] = [class {}];
    for (const key of Object.keys(objekt)) {
      class PointerData extends classess[classess.length - 1] {
        get [key]() {
          const data = Pointer.data[address] || {};
          return data[key];
        }
        set [key](value: any) {
          if (Pointer.data[address]) {
            Pointer.data[address][key] = value;
          }
        }
      }
      classess.push(PointerData);
    }
    const object = new classess[classess.length - 1]() as T;
    return Object.assign(object, { pointerAddress: address });
  }

  private static _startData() {
    this.data = this.data || {};
  }

  private static _createAddress(lenght: number): string {
    let state = '&';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < lenght - 1; i++) {
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return Object.keys(this.data).includes(state) ? this._createAddress(lenght) : state;
  }

}
