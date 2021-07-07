import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AngularFireModule } from '@angular/fire';

import { GlobalHttpInterceptorProvider } from '@app/interceptor/http/http-interceptor.provider';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NavbarLayoutModule } from './layout/navbar-layout/navbar-layout.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { BrandModule } from '@shared/components/brand/brand.module';
import { CoreModule } from '@app/core.module';
import { SnowModule } from '@shared/components/snow/snow.module';

const socketConfig: SocketIoConfig = { url: environment.serviceUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SidebarLayoutComponent,
    // NavbarLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

    HttpClientModule,

    // core & shared
    CoreModule,
    // SharedModule,

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SocketIoModule.forRoot(socketConfig),

    //
    NavbarLayoutModule,

    // Global Components
    AvatarModule,
    BrandModule,
    BreadcrumbModule,

    // Firebase Notifications
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
    GlobalHttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
