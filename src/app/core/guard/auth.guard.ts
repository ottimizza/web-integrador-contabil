import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Subject } from 'rxjs';
import { AuthSession } from '@shared/models/AuthSession';
import { switchMap, finalize } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public router: Router, public authenticationService: AuthenticationService) { }

  canActivate(): Promise<boolean> {
    const that = this;
    return new Promise<boolean>(async (resolve, reject) => {
      return that.authenticationService.isAuthenticated().then((result: boolean) => {
        if (result) {
          Promise.all([
            this.authenticationService.storeUserInfo(),
            this.authenticationService.storeTokenInfo(),
            this.authenticationService.verifyProduct()
          ]).then(() => {
            resolve(true);
          });
        } else {
          const authSession = AuthSession.fromLocalStorage();
          if (authSession.isEmpty()) {
            this.authenticationService.authorize();
          } else {
            return this.authenticationService.refresh(authSession.getAuthenticated().refreshToken)
              .pipe(
                finalize(() => resolve(true))
              ).subscribe((response: any) => {
                if (response.access_token) {
                  AuthSession.fromOAuthResponse(response).store().then(async () => {
                    this.authenticationService.storeUserInfo();
                    this.authenticationService.storeTokenInfo();
                    this.authenticationService.verifyProduct();
                  });
                } else if (response.error) {
                  this.authenticationService.authorize();
                }
              });
          }
        }
      });
    });
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

}
