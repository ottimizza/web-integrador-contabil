import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export function appIterateMap(switchFn: (item: any) => Observable<unknown>, key?: string) {
  return switchMap((resultSet) => {
    const preValues = key ? resultSet[key] : resultSet;

    if (Array.isArray(preValues)) {
      return combineLatest(preValues.map(val => switchFn(val)))
      .pipe(map(rs => {
        return {
          raw: resultSet,
          iterated: rs
        };
      }));
    } else {
      throw new Error('appIterateMap operator could not find the specified array');
    }

  });
}
