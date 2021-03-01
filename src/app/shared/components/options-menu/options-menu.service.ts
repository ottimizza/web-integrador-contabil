import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionsMenuService {

  private rightClick$ = new Subject<{ left: string, top: string }>();

  public get menuOpened$() {
    return this.rightClick$;
  }

  public onContextMenu(e: MouseEvent) {
    this.rightClick$.next({ left: e.offsetX + 'px', top: e.offsetY + 'px' });
  }

}
