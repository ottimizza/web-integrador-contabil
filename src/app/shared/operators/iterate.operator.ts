import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export function appIterateMap(operator: (item: any) => Observable<unknown>, key?: string) {
  return switchMap((resultSet) => {
    const preValues = key ? resultSet[key] : resultSet;

    if (Array.isArray(preValues)) {
      return combineLatest(preValues.map(val => operator(val)))
      .pipe(map(rs => {
        return {
          raw: preValues,
          iterated: rs
        };
      }));
    } else {
      throw new Error('appIterateMap operator could not find the specified array');
    }

  });
}
