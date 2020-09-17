import { map } from 'rxjs/operators';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';

export function ottPaginate<T>() {
  return map((result: any) => GenericPageableResponse.fromDefaultPagination(result) as GenericPageableResponse<T>);
}

export function ottUnpaginate<T>(firstOnly = true) {
  return map((result: GenericPageableResponse<T>) => GenericResponse.fromPagination(result, firstOnly));
}
