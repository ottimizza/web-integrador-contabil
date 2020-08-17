import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export function appIterate(operator: (item: any) => Observable<unknown>, key?: string) {
  return switchMap((resultSet) => {
    const preValues = key ? resultSet[key] : resultSet;

    if (Array.isArray(preValues)) {
      return combineLatest(preValues.map(val => operator(val)));
    } else {
      throw new Error('appIterate operator could not find the specified array');
    }

  });
}
