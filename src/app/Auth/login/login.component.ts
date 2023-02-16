import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        console.log("data from api", data.roleClassification);
        console.log("token" + data.token);

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.router.navigate(['administration']);
        
        if (data.isAcctActive) {
          this._snackBar.open("Sign in Successfull.Redirecting....", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          if (data.roleClassification == "Administration_privilege") {
            console.log("in administrator privilege");
            this.ngZone.run(() => this.router.navigateByUrl('administration'));
          } else if (data.roleClassification == "Employee_privilege") {
            this.ngZone.run(() => this.router.navigateByUrl('portal'));
          } else if (data.roleClassification == "Superuser_privilege") {
            this.ngZone.run(() => this.router.navigateByUrl('portal'));
          } else {
            this._snackBar.open("No access Privileges, Contact Administrator!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          }
        } else {
          this._snackBar.open("Your account is locked, contact your HR!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      },
      err => {
        this.loading = false;
        this.errorMessage = err;
        this.isLoginFailed = true;
        this._snackBar.open("Check your Credentials", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}