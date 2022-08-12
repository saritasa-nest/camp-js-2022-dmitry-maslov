import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { AuthorizedGuard } from '@js-camp/angular/core/guards/authorized.guard';
import { MaterialModule } from '@js-camp/angular/shared/material.module';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '',
    title: 'Login page',
    component: LoginPageComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'registration',
    title: 'Login page',
    component: RegistrationPageComponent,
    canActivate: [AuthorizedGuard],
  },
];

/** Auth module. */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegistrationPageComponent,
    RegistrationFormComponent,
  ],
})
export class AuthModule {}
