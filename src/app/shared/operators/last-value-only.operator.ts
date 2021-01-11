import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const data: { [id: string]: Subject<void> } = {};

export function lastValueOnly<T>(id: string) {

  if (data[id]) {
    data[id].next();
  } else {
    data[id] = new Subject();
  }

  return takeUntil<T>(data[id]);

}

