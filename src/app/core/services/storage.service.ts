import { Injectable } from '@angular/core';
import { RxEvent } from './rx-event.service';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static EVENT_STORE = 'storage:on:store';
  public static EVENT_DESTROY = 'storage:on:destroy';

  private subjects: { [key: string]: Subject<any> } = {};

  private immediate = true;

  constructor() { }

  public async store(key: string, value: string): Promise<any | void> {
    return new Promise<any | void>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    }).then(() => {
      const stored = localStorage.getItem(key);
      if (stored) {
        this._next(`storage:${key}:store`, stored);
      }
      return stored;
    });
  }

  public onStorage(key: string, handler: any): Subscription {
    return this._subscribe(`storage:${key}:store`, handler);
  }

  private _next(name: string, data?: any) {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    this.subjects[name].next(data);
  }

  private _subscribe(name: string, handler: any): Subscription {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    return this.subjects[name].subscribe(handler);
  }


  destroy(key: string): void {

  }

}
