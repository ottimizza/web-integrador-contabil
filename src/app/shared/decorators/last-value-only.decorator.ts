import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const data: { [key: string]: Subject<void> } = {};

export function LastValueOnly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const observable$: unknown = originalMethod.apply(this, args);
    if (observable$ && observable$ instanceof Observable) {

      if (data[propertyKey]) {
        data[propertyKey].next();
      } else {
        data[propertyKey] = new Subject<void>();
      }
      return observable$
      .pipe(
        takeUntil(data[propertyKey])
      );

    } else {
      console.error(`Método ${propertyKey} não retornou um Observable`);
      return observable$;
    }
  };
}
