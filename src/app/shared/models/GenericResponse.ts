import { GenericPageableResponse } from './GenericPageableResponse';

export class GenericResponse<T> {

  record: T;

  records: Array<T>;

  status: string;

  message: string;

  public static fromPagination<T>(gpr: GenericPageableResponse<T>, onlyFirst = true) {
    const gr = new GenericResponse<T>();
    gr.message = 'Ok';
    gr.status = '200';
    if (onlyFirst) {
      gr.record = gpr.records[0];
    } else {
      gr.records = gpr.records;
    }
    return gr;
  }

}
