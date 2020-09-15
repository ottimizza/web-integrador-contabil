export class StorageResponse<T> {
  body: T;
  headers: any;
  statusCode: string;
  statusCodeValue: number;

  public isOk() {
    return (typeof this.body === 'object' &&
            typeof this.headers === 'object' &&
            this.statusCode === 'OK' &&
            this.statusCodeValue === 200);
  }
}
