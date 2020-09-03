import { map } from 'rxjs/operators';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';

export function ottPaginate() {
  return map((result: any) => GenericPageableResponse.fromDefaultPagination(result));
}
