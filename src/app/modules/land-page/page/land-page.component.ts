import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { User } from '@shared/models/User';
import { environment } from '@env';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {
  currentUser: User;

  defaultColor = '#004ecb';
  supportUrl = environment.supportUrl;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
  }

  authenticate() {
    this.authenticationService.clearStorage();
    this.authenticationService.authorize();
  }

}
