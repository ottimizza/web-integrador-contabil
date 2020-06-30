import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@shared/services/toast.service';

@Injectable({ providedIn: 'root' })
export class HttpHandlerService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}

  public encode(params: any): string {
    return Object.keys(params).map((key) => {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

  public get<T>(url: string | any[], errorMessage: string, headers: any = this._headers): Observable<T> {
    url = this._urlHandle(url);
    const obs$ = this.http.get(url, headers);
    return this._errorHandle(obs$, errorMessage);
  }

  public post<T>(url: string | any[], body: any, errorMessage: string, headers: any = this._headers): Observable<T> {
    url = this._urlHandle(url);
    const obs$ = this.http.post(url, body, headers);
    return this._errorHandle(obs$, errorMessage);
  }

  public put<T>(url: string | any[], body: any, errorMessage: string, headers: any = this._headers): Observable<T> {
    url = this._urlHandle(url);
    const obs$ = this.http.put(url, body, headers);
    return this._errorHandle(obs$, errorMessage);
  }

  public patch<T>(url: string | any[], body: any, errorMessage: string, headers: any = this._headers): Observable<T> {
    url = this._urlHandle(url);
    const obs$ = this.http.patch(url, body, headers);
    return this._errorHandle(obs$, errorMessage);
  }

  public delete<T>(url: string | any[], errorMessage: string, headers: any = this._headers): Observable<T> {
    url = this._urlHandle(url);
    const obs$ = this.http.delete(url, headers);
    return this._errorHandle(obs$, errorMessage);
  }

  private _errorHandle(observable$: Observable<any>, errorMessage: string): Observable<any> {
    return observable$.pipe(catchError(err => {
      if (errorMessage && errorMessage.length) { this.toastService.show(errorMessage, 'danger'); }
      console.error(err);
      throw err;
    }));
  }

  private _urlHandle(url: string | any[]): string {
    if (Array.isArray(url) && typeof url[0] === 'string' && typeof url[1] === 'object') {
      return `${url[0]}?${this.encode(url[1])}`;
    } else if (Array.isArray(url)) {
      throw new Error(`O Array-URL passado não está no formato certo. Esperado: [baseUrl: string, params: Object]`);
    } else {
      return url;
    }
  }

  private get _headers() {
    const headers = this.authenticationService.getAuthorizationHeaders();
    return { headers };
  }

}
