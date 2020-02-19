import { NgModule } from '@angular/core';
import { AuthCallbackComponent } from './page/callback/callback.component';
import { AuthRoutingModule } from './auth.routing';
import { LogoutComponent } from './page/logout/logout.component';

// import { SharedModule } from '@shared/shared.module';

// import { UserDetailsComponent } from './page/user-details/user-details.component';

@NgModule({
  declarations: [
    AuthCallbackComponent,
    LogoutComponent
    // UserDetailsComponent
  ],
  imports: [
    // SharedModule,
    AuthRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class AuthModule { }
