import { LoggerUtils } from '@shared/utils/logger.utills';
import { TransactionDetailComponent } from '@modules/transacoes/transaction-detail/transaction-detail.component';

export function PerformanceTest() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const from = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const timer1 = performance.now();
      const returning = from.apply(this, args);
      const timer2 = performance.now();
      LoggerUtils.log(timer2 - timer1);
      return returning;
    };

    return descriptor;

  }
}
