import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalVariableService {

  private vars: any = {};
  private BACKUP_KEY = '_global-variables:backup';
  private ROUTER_KEY = '_globa-variables:routerData';

  constructor(
    private router: Router,
  ) {
    this.vars = this._restore();
  }

  /**
   * @deprecated
   */
  public async setUniqueVariable(name: string, value: any, backup = false) {
    if (!this.has(name)) {
      return this.setVariable(name, value, backup);
    }
    return false;
  }

  public async setVariable(name: string, value: any, backup = false): Promise<true> {
    this.vars[name.toUpperCase()] = value;
    if (backup) {
      await this._backup();
    }
    return true;
  }

  public getVariable<T>(name: string): T | null {
    return this.vars[name.toUpperCase()] || null;
  }

  public has(name: string) {
    return (this.getVariable(name) !== undefined);
  }

  public isSetted(value: any) {
    const index = Object.values(this.vars).indexOf(value);
    const key = Object.keys(this.vars)[index];

    return [index >= 0, key || null];
  }

  /**
   * @deprecated
   */
  public async setAnonymousVariable(value: any, backup = false): Promise<string> {
    const key = this._generateAnonymousKey();
    if (await this.setUniqueVariable(key, value, backup)) {
      return key;
    }
    return this.setAnonymousVariable(value, backup);
  }

  public async deleteVariable(name: string, backup = true) {
    const result = delete this.vars[name.toUpperCase()];

    if (backup) {
      await this._backup();
    }
    return result;
  }

  private _backup() {
    return new Promise(resolve => {
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(this.vars));
      resolve('ok');
    });
  }

  private _restore() {
    const json = localStorage.getItem(this.BACKUP_KEY);
    return (json && json !== '{}') ? JSON.parse(json) : {};
  }

  private _generateAnonymousKey() {
    let key = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  }

  public async navigateWithData(commands: any[], data: any) {
    await this.setVariable(this.ROUTER_KEY, data);
    await this.router.navigate(commands);
    return true;
  }

  public get routeData() {
    return this.getVariable(this.ROUTER_KEY);
  }

}
