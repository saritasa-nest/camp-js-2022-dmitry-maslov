import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page.component';

const routes: Routes = [
  { path: '', title: 'Login page', component: LoginPageComponent },
  { path: 'registration', title: 'Login page', component: LoginPageComponent },
];

/** Auth module. */
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
})
export class AuthModule {}
