import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { MaterialModule } from '../material.module';
import { JwtInterceptor } from 'src/app/Auth/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/Auth/helpers/error.interceptor';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    AuthenticatedComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


],
})
export class AuthModule { }
