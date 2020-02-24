import { environment } from '@env';

export class LoggerUtils {

  private static _environment: any;

  public static log(message: any) {
    this._execute(() => {
      console.log(message);
    });
  }

  public static error(message: any) {
    this._execute(() => {
      console.error(message);
    });
  }

  public static throw(message: Error) {
    this._execute(() => {
      throw message;
    });
  }

  private static _execute(callbackFn: () => void) {
    if (!this._environment) {
      this._environment = environment;
    }
    if (this._environment.production === false) {
      callbackFn();
    }
  }

}
