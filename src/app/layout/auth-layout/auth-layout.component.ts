import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  // private overlayContainer: OverlayContainer;

  public sidebarEffect = '';
  public sidebarOpened = false;


  public theme = 'my-light-theme';

  constructor(public route: ActivatedRoute
    // private themeService: ThemeService
  ) { }

  public toggleSidebar(effect: string) {
    this.sidebarEffect = effect;
    this.sidebarOpened = !this.sidebarOpened;
  }
  public ngOnInit() {
    // // this.name = this.route.snapshot.queryParamMap.get("paramName")
    // this.route.queryParamMap.subscribe(queryParams => {
    //   const callbackCode = queryParams.get('code');

    //   if (callbackCode) {
    //     prompt(`Callback Code: `, callbackCode);
    //   }

    // });
  }
}
