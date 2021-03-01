import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SnapshotService {

  private _propertiesToSave: string[];
  private _data: any = {};

  public register(...keys: string[]) {
    this._propertiesToSave = keys || [];
  }

  public print(currentState: any) {
    if (this._propertiesToSave) {
      this._propertiesToSave.forEach(key => {
        this._data[key] = currentState[key];
      });
    }
  }

  public clean() {
    this._data = {};
  }

  public restore(currentState: any) {
    if (this._propertiesToSave) {
      Object.assign(currentState, this._data);
    }
  }

  /**
   * Salva o estado atual do Componente e retorna um Subject que
   * ao ser chamado, volta o componente ao estado inicial
   * @param currentState this
   * @param keys propriedades a serem salvas
   */
  public recycle<T>(currentState: T, keys: Array<keyof T>) {
    this.register(...keys as string[]);
    this.print(currentState);
    const sub = new Subject<void>();
    sub.pipe(take(1)).subscribe(() => {
      this.restore(currentState);
      this.clean();
    });
    return sub;
  }

}
