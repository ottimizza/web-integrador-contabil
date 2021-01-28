import { Injectable } from '@angular/core';
import { Subject, Subscription, BehaviorSubject, OperatorFunction, PartialObserver } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

@Injectable({
  providedIn: 'root'
})
export class RxEvent {

  private subjects: { [key: string]: Subject<any> } = {};

  private immediate = true;

  next(name: string, data?: any) {
    return this.get(name).next(data);
  }

  subscribe(name: string, handler: any): Subscription {
    return this.get(name).subscribe(handler);
  }

  public use(operators: OperatorFunction<any, any>[], event: string, handler: PartialObserver<any>) {
    return this.get(event)
    .pipe(pipeFromArray(operators))
    .subscribe(handler);
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

  private get(name: string) {
    if (this.subjects[name] === undefined) {
      this.subjects[name] = (this.immediate ? new Subject() : new BehaviorSubject(null));
    }
    return this.subjects[name];
  }
}
