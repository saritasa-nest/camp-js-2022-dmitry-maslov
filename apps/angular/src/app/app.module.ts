import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from '../core/interceptors/api-key-interceptor';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true,
  },
];

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, HttpClientModule],
  providers: [...httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
