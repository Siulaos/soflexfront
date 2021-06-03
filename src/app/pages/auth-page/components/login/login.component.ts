import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRQLogin, IToken } from 'src/app/commons/models/auth';
import { AuthService } from 'src/app/commons/services/auth.service';
import { JwtAuthService } from 'src/app/commons/services/jwt-auth.service';
import { MODEL_LOGIN_ERRORS } from './login-error-msg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtAuth: JwtAuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.loginForm.get('')?.markAsPristine();
  }

  clickLogin(): void {
    if (this.loginForm?.valid) {
      const user: IRQLogin = {
        username: this.loginForm?.get('username')?.value,
        password: this.loginForm?.get('password')?.value,
      };
      this.authService.login(user).subscribe((data: IToken) => {
        this.jwtAuth.login(data.access_token);
        void this.router.navigateByUrl('dashboard');
      });
    }
  }
  clickRegister(): void {
    void this.router.navigateByUrl('register');
  }

  getControlError(controlName: string): string {
    let error = '';
    const ctrl = this.loginForm?.get(controlName);

    if (ctrl?.invalid && ctrl?.dirty) {
      const attributeError = MODEL_LOGIN_ERRORS.find(
        (c) => c.formControlName == controlName
      );

      const validator = attributeError?.validators.find(
        (v) => ctrl.errors![v.name]
      );

      return validator!.message;
    }
    return error;
  }

  get usernameAbs(): AbstractControl | null | undefined {
    return this.loginForm?.get('username');
  }

  get passwordAbs(): AbstractControl | null | undefined {
    return this.loginForm?.get('password');
  }
}
