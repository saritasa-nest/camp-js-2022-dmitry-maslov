import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

import { UnauthorizedGuard } from '@js-camp/angular/core/guards/unauthorized.guard';

import { AuthorizedGuard } from '@js-camp/angular/core/guards/authorized.guard';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

const routes: Routes = [
  { path: '', title: 'Login page', component: LoginPageComponent, canActivate: [AuthorizedGuard] },
  { path: 'registration', title: 'Login page', component: RegistrationPageComponent, canActivate: [AuthorizedGuard] },
];

/** Auth module. */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegistrationPageComponent,
    RegistrationFormComponent,
  ],
})
export class AuthModule {}
