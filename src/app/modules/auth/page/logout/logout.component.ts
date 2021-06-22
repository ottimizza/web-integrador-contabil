import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { AuthSession } from '@shared/models/AuthSession';
import { environment } from '@env';
import { DomSanitizer } from '@angular/platform-browser';

// import { Project } from '../../../../data/schema/project';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  // cria um iframe para o oauth server poder excluir os cookies relacionados
  url = this.sanitizer.bypassSecurityTrustResourceUrl(
    `${environment.oauthBaseUrl}/logout`
  );

  constructor(
    public sanitizer: DomSanitizer,
    public router: Router,
    public route: ActivatedRoute,
    public authenticationService: AuthenticationService
  ) { }

  // evento invocado após o iframe tenha sido carregado.
  public onLoad() {
    this.logout();
  }

  public logout() {
    this.authenticationService.revokeToken()
      .subscribe((response: any) => {
        this.authenticationService.clearStorage();
        this.authenticationService.authorize();
      });
  }

  ngOnInit(): void {
    this.logout();
  }

  pause(value = '') {
    prompt('App Pause', value);
  }

}
