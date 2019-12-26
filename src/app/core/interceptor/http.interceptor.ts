import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable, EMPTY, throwError, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthSession } from '@shared/models/AuthSession';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  private UNAUTHORIZED = 401;

  private _refreshSubject: Subject<any> = new Subject<any>();

  constructor(private authenticationService: AuthenticationService) { }

  private _ifTokenExpired() {
    this._refreshSubject.subscribe({
      complete: () => {
        this._refreshSubject = new Subject<any>();
      }
    });
    if (this._refreshSubject.observers.length === 1) {
      const authSession = AuthSession.fromLocalStorage();
      this.authenticationService.refresh(authSession.getAuthenticated().refreshToken).subscribe(this._refreshSubject);
    }
    return this._refreshSubject;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (error.status === this.UNAUTHORIZED) {
            if (this.requestMatchesRefreshTokenURL(request)) {
              this.requestAuthorization();
            }

            return this._ifTokenExpired().pipe(
              switchMap((response) => {
                if (response.access_token) {
                  AuthSession.fromOAuthResponse(response).store().then(async () => {
                    const storeUserInfo = this.authenticationService.storeUserInfo();
                    const storeTokenInfo = this.authenticationService.storeTokenInfo();
                  });
                }
                return next.handle(this.updateHeader(request));
              })
            );
          } else {
            if (this.requestMatchesRefreshTokenURL(request)) {
              this.authenticationService.clearStorage();
              this.requestAuthorization();
            }
            return throwError(error);
          }
        }
        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        return EMPTY;
      })
    );
  }

  updateHeader(req) {
    const accessToken = AuthSession.fromLocalStorage().getAuthenticated().accessToken;
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return req;
  }

  private requestMatchesRefreshTokenURL(request: HttpRequest<any>): boolean {
    return request.url.includes(AuthenticationService.REFRESH_URL);
  }

  private requestAuthorization() {
    this.authenticationService.authorize();
  }


}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};