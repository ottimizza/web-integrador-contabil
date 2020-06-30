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

import { Observable, EMPTY, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { MocksService, refreshtoken_resource } from '@app/http/mocks.service';
import { AuthenticationService, REFRESH_URL, CALLBACK_URL } from '@app/authentication/authentication.service';
import { AuthSession } from '@shared/models/AuthSession';
import { SKIP_INTERCEPTOR } from '../skip-interceptor';

export const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  private refreshTokenEmProgresso = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authenticationService: AuthenticationService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const groupId: string = this.id();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (request.headers.has(SKIP_INTERCEPTOR)) {
          return throwError(error);
        }

        if (error.error instanceof Error) {
        } else {
          if (error.status === HttpStatus.UNAUTHORIZED) {

            if (this.requestMatchesCallbackURL(request)) {
              // TODO: Enviar para tela pré-login
              this.logout();
              return throwError(error);
            }

            if (this.refreshTokenEmProgresso) {
              this.log('Waiting Refresh...', request, error, groupId);
              return this.refreshTokenSubject
                .pipe(
                  filter(result => result !== null), take(1),
                  switchMap(() => next.handle(this.addAuthenticationToken(request)))
                );
            } else {
              this.refreshTokenEmProgresso = true;

              this.refreshTokenSubject.next(null);
              return this.authenticationService.refresh(AuthSession.fromLocalStorage().getAuthenticated().refreshToken).pipe(
                switchMap((response: any) => {
                  this.refreshTokenEmProgresso = false;
                  this.refreshTokenSubject.next(response);

                  AuthSession.fromOAuthResponse(response).store().then(async () => {
                    const storeUserInfo = this.authenticationService.storeUserInfo(true);
                    const storeTokenInfo = this.authenticationService.storeTokenInfo(true);
                  });

                  return next.handle(this.addAuthenticationToken(request));
                }),
                catchError((err: any) => {
                  this.refreshTokenEmProgresso = false;

                  this.logout();
                  return throwError(err);
                })
              );
            }

            // return throwError(error);
          }
        }
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }



  log(message: string, request: HttpRequest<any>, error: HttpErrorResponse, groupId = null) {
    const cn = GlobalHttpInterceptor.name;
    const ts = new Date().toISOString();
    const status = error.status;
    const url = request.url;

    if (groupId) {
      console.log(`${groupId} [${cn}] [${ts}] [${status} - ${url}]: ${message}`);
    } else {
      console.log(`[${cn}] [${ts}] [${status} - ${url}]: ${message}`);
    }

  }


  addAuthenticationToken(request) {
    const accessToken = AuthSession.fromLocalStorage().getAuthenticated().accessToken;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'X-Skip-Interceptor': ''
      }
    });
  }

  private requestMatchesRefreshTokenURL(request: HttpRequest<any>): boolean {
    return request.url.includes(REFRESH_URL);
  }

  private requestMatchesCallbackURL(request: HttpRequest<any>): boolean {
    return request.url.includes(CALLBACK_URL);
  }

  private logout() {
    this.authenticationService.clearStorage();
    this.authenticationService.authorize();
  }

  private id() {
    let state = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return state;
  }

}
