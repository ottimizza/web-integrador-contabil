import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@app/core.module';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { BrandModule } from '@shared/components/brand/brand.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorInterceptor, ErrorInterceptorProvider } from '@app/interceptor/http.interceptor';
import { NavbarLayoutModule } from './layout/navbar-layout/navbar-layout.module';
import { RuleListModule } from '@modules/rule-list/rule-list.module';
import { TransactionModule } from '@modules/transacoes/transaction.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from '@app/services/messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SidebarLayoutComponent
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

    //
    NavbarLayoutModule,

    // Global Components
    AvatarModule,
    BrandModule,
    BreadcrumbModule,

    // Firebase Notifications
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),



    // Entry Components
    TransactionModule,

    // Rules
    RuleListModule
  ],
  providers: [
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
