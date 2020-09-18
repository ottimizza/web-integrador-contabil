import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { User } from '@shared/models/User';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthenticationService) {}

  async canActivate() {
    await this.auth.storeTokenInfo();
    const user = User.fromLocalStorage();
    return user.type === User.Type.ADMINISTRATOR;
  }

  canActivateChild() {
    return this.canActivate();
  }


}
