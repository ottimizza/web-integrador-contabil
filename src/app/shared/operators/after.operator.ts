import { TimeUtils } from '@shared/utils/time.utils';
import { finalize } from 'rxjs/operators';

export function after(exec: () => void, delay = 0, filter = () => true, thisArgs?: any) {
  return finalize(async () => {
    await TimeUtils.sleep(delay);
    if (filter.apply(thisArgs)) {
      exec.apply(thisArgs);
    }
  });
}
