import { ObjectUtils } from '@shared/utils/object.utils';

export abstract class Pointer {

  protected static data: any;

  public static delete(address: string) {
    delete Pointer.data[address];
  }

  public static new<T>(objekt: object & T) {
    this._startData();
    const address = this._createAddress();

    Pointer.data[address] = objekt;
    const classess: any[] = [class {}];
    for (const key of Object.keys(objekt)) {
      const Clazz = class extends classess[classess.length - 1] {
        get [key]() {
          return Pointer.data[address][key];
        }
        set [key](value: any) {
          Pointer.data[address][key] = value;
        }
      };
      classess.push(Clazz);
    }
    const object = new classess[classess.length - 1]() as T;
    return Object.assign(object, { pointerAddress: address });
  }

  private static _startData() {
    this.data = this.data || {};
  }

  private static _createAddress(): string {
    let state = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return Object.keys(this.data).includes(state) ? this._createAddress() : state;
  }

}
