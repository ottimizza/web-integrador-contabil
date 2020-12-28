import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// export function beforeComponentDestroyed(component: OnDestroy) {
//   const oldNgOnDestroy = component.ngOnDestroy;
//   const destroyed$ = new ReplaySubject<void>(1);
//   component.ngOnDestroy = () => {
//     console.log('PELO AMOR DE DEUS FUNCIONA!!!!!!!!!');
//     oldNgOnDestroy.apply(component);
//     destroyed$.next(undefined);
//     destroyed$.complete();
//   };
//   return takeUntil(destroyed$);
// }

@Component({
  template: ''
})
export class BeforeComponentDestroyed implements OnDestroy {

  private destroyed$ = new ReplaySubject<void>(1);

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  protected get takeUntil() {
    return takeUntil(this.destroyed$);
  }

}
