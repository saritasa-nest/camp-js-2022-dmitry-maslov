import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiKeyInterceptor } from '../core/interceptors/api-key-interceptor';

import { AuthInterceptor } from '../core/interceptors/auth-interceptor';

import { RefreshTokenInterceptor } from '../core/interceptors/refresh-token-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './../shared/shared.module';

const httpInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [...httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}