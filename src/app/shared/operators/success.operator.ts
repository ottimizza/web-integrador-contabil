import { throwError } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { catchError, finalize } from 'rxjs/operators';

export function success(operator: (success: boolean) => void) {
  let ok = true;
  return pipeFromArray([
    catchError(err => {
      ok = false;
      return throwError(err);
    }),
    finalize(() => operator(ok))
  ]);
}

export function successOnly(operator: () => void) {
  return success(suc => {
    if (suc) {
      operator();
    }
  });
}
