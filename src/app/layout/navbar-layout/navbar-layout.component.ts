import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from '@shared/models/User';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { StorageService } from '@app/services/storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagingService } from '@app/services/messaging.service';
import { LoggerUtils } from '@shared/utils/logger.utills';
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
    public dialog: MatDialog,
    public router: Router,
    public storageService: StorageService,
    public authorizationService: AuthenticationService,
    public messagingService: MessagingService
  ) {}

  public toggleSidebar() {
    const body = this.document.getElementsByTagName('body')[0];
    const sidebar: HTMLElement = this.document.getElementsByClassName(
      'left-sidebar'
    )[0] as HTMLElement;
    body.classList.toggle('show-sidebar');

    const width = window.innerWidth || this.document.documentElement.clientWidth || this.document.body.clientWidth;

    if (width >= 768) {
      this.document.querySelectorAll('.main-wrapper').forEach(el => {
        el.classList.toggle('compact-width');
      });
    }

    sidebar.focus();
  }

  public shouldShowAccountingDetailsPage() {
    return [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);
  }

  public logout() {
    this.router.navigate(['auth', 'logout']);
    // this.authorizationService.revokeToken().subscribe((r1: any) => {
    //   this.authorizationService.clearStorage();
    //   return this.authorizationService.logout().subscribe((r2: any) => {
    //     this.authorizationService.authorize();
    //   });
    // });
  }

  allowNotifications() {
    this.messagingService.requestPermission();
  }

  ngOnInit() {
    this.storageService.onStorage(AuthenticationService.STORAGE_KEY_USERINFO, (result: any) => {
      this.currentUser = User.fromLocalStorage();
      if (this.currentUser.organization) {
        const avatar = this.currentUser.organization.avatar;
        this.logo = avatar ? avatar : this.DEFAULT_LOGO;
      }
    });
    this.currentUser = User.fromLocalStorage();
    if (this.currentUser.organization) {
      const avatar = this.currentUser.organization.avatar;
      this.logo = avatar ? avatar : this.DEFAULT_LOGO;
    }
  }
}
