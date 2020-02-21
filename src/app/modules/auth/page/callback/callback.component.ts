import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { AuthSession } from '@shared/models/AuthSession';

// import { Project } from '../../../../data/schema/project';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  public callbackCode: string;

  constructor(public router: Router, public route: ActivatedRoute, public authenticationService: AuthenticationService) { }

  public ngOnInit() {
    const that = this;
    this.route.queryParamMap.subscribe(queryParams => {
      this.callbackCode = queryParams.get('code');
      if (this.callbackCode) {
        that.authenticationService.exchange(this.callbackCode).subscribe((response: any) => {
          if (response.access_token) {
            AuthSession.fromOAuthResponse(response).store().then(async () => {
              // const storeUserInfo = that.authenticationService.storeUserInfo();
              // const storeTokenInfo = that.authenticationService.storeTokenInfo();

              // return Promise.all([
              //   storeUserInfo,
              //   storeTokenInfo
              // ]).then((values) => {
              that.router.navigate(['lancamentos']);
              // }).catch((e) => {
              //   console.log(e);
              // });
            });
          }
        });
      }
    });
  }

  pause(value = '') {
    prompt('App Pause', value);
  }

}
