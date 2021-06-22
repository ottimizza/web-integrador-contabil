
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthSession } from '@shared/models/AuthSession';
import { finalize } from 'rxjs/operators';
import { StorageService } from '@app/services/storage.service';

import { environment } from '@env';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { Router } from '@angular/router';
import { SKIP_INTERCEPTOR } from '@app/interceptor/skip-interceptor';

export const REFRESH_URL = '/auth/refresh';
export const CALLBACK_URL = '/auth/callback';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static REFRESH_URL = '/auth/refresh';

  static STORAGE_KEY_USERINFO = 'user-info';
  static STORAGE_KEY_TOKENINFO = 'token-info';
  static STORAGE_KEY_AUTHSESSION = 'auth-session';

  public redirectURI = `${window.location.origin}/auth/callback`;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    public storageService: StorageService,
    private router: Router) { }

  public store(authSession: AuthSession): Promise<{}> {
    return new Promise<boolean>((resolve, reject) => {
      localStorage.setItem(AuthenticationService.STORAGE_KEY_USERINFO, authSession.toString());
      resolve();
    });
  }

  public destroy(): Promise<{}> {
    return new Promise<boolean>((resolve, reject) => {
      localStorage.removeItemsetItem(AuthenticationService.STORAGE_KEY_USERINFO);
      resolve();
    });
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const authSession: AuthSession = AuthSession.fromLocalStorage();
      if (authSession !== null && typeof authSession !== 'undefined') {
        resolve(!authSession.isExpired());
      } else {
        resolve(false);
      }
    });
  }

  public async storeUserInfo(skipInterceptor = false): Promise<void> {
    const headers = this.getAuthorizationHeadersWithSkipInterceptor(skipInterceptor);
    return new Promise<void>((resolve, reject) => {
      return this.http.get(`${environment.oauthBaseUrl}/oauth/userinfo`, { headers })
        .pipe(
          finalize(() => {
            resolve();
          })
        ).subscribe((response: any) => {
          this.storageService.store(AuthenticationService.STORAGE_KEY_USERINFO, JSON.stringify(response.record));
        });
    }).then(() => { });
  }

  public async storeTokenInfo(skipInterceptor = false): Promise<void> {
    const headers = this.getAuthorizationHeadersWithSkipInterceptor(skipInterceptor);
    return new Promise<void>((resolve, reject) => {
      return this.http.get(`${environment.oauthBaseUrl}/oauth/tokeninfo`, { headers })
        .pipe(
          finalize(() => {
            resolve();
          })
        ).subscribe((response: any) => {
          this.storageService.store(AuthenticationService.STORAGE_KEY_TOKENINFO, JSON.stringify(response));
        });
    }).then(() => { });
  }

  public async verifyProduct() {
    const headers = this.getAuthorizationHeadersWithSkipInterceptor(true);
    const url = `${environment.oauthBaseUrl}/api/v1/check_products/${environment.oauthClientId}`;
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { headers })
        .pipe(finalize(() => resolve()))
        .subscribe(null, err => {
          console.error(err);
          if (err.status === 403) {
            alert(
              'Seu usuário não tem acesso a este produto! Se você acha que isto é um erro, entre em contato com seu administrador.'
            );
            this.authorize();
          }
        });
    });
  }

  public clearStorage() {
    localStorage.removeItem(AuthenticationService.STORAGE_KEY_USERINFO);
    localStorage.removeItem(AuthenticationService.STORAGE_KEY_TOKENINFO);
    localStorage.removeItem(AuthenticationService.STORAGE_KEY_AUTHSESSION);
  }


  public authorize(responseType: string = 'code'): void {
    const baseUrl = `${environment.oauthBaseUrl}/oauth/authorize/oauthchooseaccount`;
    const clientId = `${environment.oauthClientId}`;
    const url = `${baseUrl}?response_type=${responseType}&prompt=login&client_id=${clientId}&redirect_uri=${this.redirectURI}`;
    this.document.location.href = url;
  }

  public exchange(code: string) {
    const url = `${environment.serviceUrl}/auth/callback?code=${code}&redirect_uri=${this.redirectURI}`;
    return this.http.post(url, {}, {});
  }

  public refresh(refreshToken: string) {
    const headers = new HttpHeaders({
      'X-Skip-Interceptor': ''
    });
    const clientId = `${environment.oauthClientId}`;
    const url = `${environment.serviceUrl}/auth/refresh?refresh_token=${refreshToken}&client_id=${clientId}`;
    return this.http.post(url, {}, { headers });
  }

  public revokeToken() {
    const url = `${environment.oauthBaseUrl}/oauth/revoke_token`;
    const headers = this.getAuthorizationHeaders();
    return this.http.delete(url, { headers });
  }

  public logout() {
    const url = `${environment.oauthBaseUrl}/logout`;
    return this.http.get(url, { responseType: 'text' });
  }

  public getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getAccessToken().trim()}`);
  }

  public getAuthorizationHeadersWithSkipInterceptor(skipInterceptor: boolean): HttpHeaders {
    const headers = this.getAuthorizationHeaders();
    if (skipInterceptor) {
      headers.append(SKIP_INTERCEPTOR, '');
    }
    return headers;
  }

  public getNoBearerAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.getAccessToken().trim()}`);
  }

  public getAccessToken(): string {
    return this.getAuthSession().authenticated.accessToken || null;
  }

  public getAuthSession(): AuthSession {
    const authSession = localStorage.getItem('auth-session') || null;
    if (authSession) {
      return JSON.parse(authSession);
    }
    return null;
  }

  genState() {
    let state = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return state;
  }

}
