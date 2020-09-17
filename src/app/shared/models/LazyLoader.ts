import { Observable } from 'rxjs';

class CallResponse<T> {
  oldValue: T;
  currentValue: T;
  requestResponse: unknown;
}

export class LazyLoader<T> {

  // tslint:disable: variable-name
  private _value: T;
  private _timesCalled = 0;

  private _isCalling = false;
  private _isCalled = false;
  private _isValid = false;

  private _path: any[];
  private _origin: Observable<any> | Promise<any>;

  constructor(value?: T) {
    this._value = value;
  }

  public train(origin?: Promise<any> | Observable<any>, ...path: (string | number | symbol)[]) {
    this._path = path;
    this._origin = origin;
    return this;
  }

  public get isCalling() {
    return this._isCalling;
  }

  public get isCalled() {
    return this._isCalled;
  }

  public get isValid() {
    return this._isValid;
  }

  public get value() {
    return this._value;
  }

  public get timesCalled() {
    return this._timesCalled;
  }

  public setValue(value: T) {
    this._value = value;
  }

  /**
   * @description Realiza uma chamada assíncrona para obter o value
   * @param origin Observable ou Promise de onde as informações serão retiradas
   * @param path Parâmetro opcional que indica a posição da informação desejada dentro do resultado
   * @returns Uma Promise que resolve ao final da chamada
   * @example .call(this.service.fetch(), 'records', 0) retornará o primeiro elemento de um Generic(Pageable)Response
   */
  public call(origin?: Promise<any> | Observable<any>, ...path: (string | number | symbol)[]): Promise<CallResponse<T>> {
    if (this._path && !path) {
      path = this._path;
    }
    if (this._origin && !origin) {
      origin = this._origin;
    }
    const oldValue = this._value;
    this._isCalling = true;
    this._timesCalled++;

    return new Promise(resolve => {
      path = path || [];
      if (origin instanceof Promise) {
        origin.then(result => this._resolve(result, path, resolve, oldValue));
      } else {
        origin.subscribe(result => this._resolve(result, path, resolve, oldValue));
      }
    });

  }

  /**
   * @description Limpa todo o conteúdo para que ele possa ser recarregado do zero sem criar uma nova variável da memória
   */
  public clear() {
    this._value = undefined;
    this._timesCalled = 0;
    this._isCalled = false;
  }

  private _callbackResult(data: any, path: any[]) {
    let finalData = data;
    if (path.length > 0) {
      path.forEach(key => finalData = finalData[key]);
    }
    this._value = finalData;
  }

  private _resolve(result: any, path: any[], resolve: any, oldValue: T) {
    this._callbackResult(result, path);
    this._isCalling = false;
    this._isCalled = true;
    this._validate();
    resolve({ oldValue, currentValue: this._value, requestResponse: result });
  }

  private _validate() {
    this._isValid = this._value !== null && this._value !== undefined && this._isCalled;
  }

}
