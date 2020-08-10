import { environment } from '@env';

export function Deprecated(tip?: string, showTip = !environment.production) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      if (tip && showTip) {
        console.warn(`Method ${propertyKey} is deprecated`, tip);
      }
      return originalMethod.apply(this, args);
    };
  };

}
