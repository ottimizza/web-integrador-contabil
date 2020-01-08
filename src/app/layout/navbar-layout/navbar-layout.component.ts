import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from '@shared/models/User';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { StorageService } from '@app/services/storage.service';
import { Router } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {
  public DEFAULT_LOGO = 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/logo.png';

  currentUser: User;

  logo: string = this.DEFAULT_LOGO;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public storageService: StorageService,
    public authorizationService: AuthenticationService
  ) { }

  public toggleSidebar() {
    const body = this.document.getElementsByTagName('body')[0];
    const sidebar: HTMLElement = this.document.getElementsByClassName('left-sidebar')[0] as HTMLElement;

    body.classList.toggle('show-sidebar');
    sidebar.focus();
  }

  public logout() {
    this.authorizationService.revokeToken().subscribe((r1: any) => {
      this.authorizationService.clearStorage();
      return this.authorizationService.logout().subscribe((r2: any) => {
        this.authorizationService.authorize();
      });
    });
  }

  public altToggleSidebar() {
    const sidebar = this.document.querySelector('.left-sidebar');
    const mains = this.document.getElementsByClassName('main-wrapper');
    const location = this.document.querySelector('.page-wrapper');

    if (sidebar.classList.contains('alt-collapsed')) {
      sidebar.classList.remove('alt-collapsed');
      sidebar.classList.add('un-alt-collapsed');
      location.classList.remove('alt-main-wrapper');
      // tslint:disable: prefer-for-of
      for (let i = 0; i < mains.length; i++) {
        mains[i].classList.remove('alt-main-wrapper');
      }
    } else {
      sidebar.classList.remove('un-alt-collapsed');
      sidebar.classList.add('alt-collapsed');
      location.classList.add('alt-main-wrapper');
      for (let i = 0; i < mains.length; i++) {
        mains[i].classList.add('alt-main-wrapper');
      }
    }
  }

  ngOnInit() {
    this.storageService.onStorage(AuthenticationService.STORAGE_KEY_USERINFO, (result: any) => {
      this.currentUser = User.fromLocalStorage();
      if (this.currentUser.organization) {
        const avatar = this.currentUser.organization.avatar;
        this.logo = (avatar) ? avatar : this.DEFAULT_LOGO;
      }
    });
    this.currentUser = User.fromLocalStorage();
    if (this.currentUser.organization) {
      const avatar = this.currentUser.organization.avatar;
      this.logo = (avatar) ? avatar : this.DEFAULT_LOGO;
    }
  }
}
