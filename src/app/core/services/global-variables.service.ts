import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalVariableService {

  private vars: any = {};
  private BACKUP_KEY = `global-variables:backup`;

  constructor() {
    this.vars = this._restore();
  }

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
    return !!this.getVariable(name);
  }

  public isSetted(value: any) {
    const index = Object.values(this.vars).indexOf(value);
    const key = Object.keys(this.vars)[index];

    return [index >= 0, key || null];
  }

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
      resolve();
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

}
