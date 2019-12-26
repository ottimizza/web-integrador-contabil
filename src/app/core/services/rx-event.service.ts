import { Injectable } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxEvent {

  private subjects: { [key: string]: Subject<any> } = {};

  private immediate = true;

  next(name: string, data?: any) {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    this.subjects[name].next(data);
  }

  subscribe(name: string, handler: any): Subscription {
    if (typeof this.subjects[name] === 'undefined') {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    return this.subjects[name].subscribe(handler);
  }


  dispose(name: string) {
    if (this.subjects[name]) {
      this.subjects[name].unsubscribe();
      delete this.subjects[name];
    }
  }

  disposeAll() {
    const subjects = this.subjects;
    const hasOwnProp: (v: string | number | symbol) => boolean = {}.hasOwnProperty;
    for (const prop in subjects) {
      if (hasOwnProp.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }
    this.subjects = {};
  }
}
