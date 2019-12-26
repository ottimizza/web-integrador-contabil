export class GenericResponse<T> {

  record: T;

  records: Array<T>;

  status: string;

  message: string;

}
