import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth-page/auth.component';
import { LoginComponent } from '../auth-page/components/login/login.component';
import { RegisterComponent } from '../auth-page/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AuthComponent, LoginComponent, RegisterComponent],
})
export class AuthModule {}
