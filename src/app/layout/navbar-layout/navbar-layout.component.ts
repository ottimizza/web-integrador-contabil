import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { MessagingService } from '@app/services/messaging.service';
import { StorageService } from '@app/services/storage.service';
import { User } from '@shared/models/User';
import { Router } from '@angular/router';

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
  ) { }

  public toggleSidebar() {
    const body = this.document.getElementsByTagName('body')[0];
    const sidebar: HTMLElement = this.document.getElementsByClassName('left-sidebar')[0] as HTMLElement;
    body.classList.toggle('show-sidebar');

    sidebar.focus();
  }

  public shouldShowAccountingDetailsPage() {
    return [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);
  }

  public logout() {
    this.router.navigate(['auth', 'logout']);
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
