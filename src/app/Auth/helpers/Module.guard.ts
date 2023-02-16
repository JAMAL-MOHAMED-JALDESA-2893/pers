import { CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/Service/authentication.service';


@Injectable()
export class ModuleGuard implements CanLoad {
  routeRole: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
  }

  canLoad(route: Route) {

    // this.currentUser = sessionStorage.getItem('auth-user'); Role.Administration_privilege
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    if (currentUser) {
      // check if route is restricted by role
      this.routeRole = route.data;
      if (currentUser.roleClassification == "Administration_privilege") {
        // authorised so return true
        return true;
      } else {
        // role not authorised so redirect to home page
        this._snackBar.open("Sorry! No sufficient permissions to access!.", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
        // this.router.navigate(['/Auth/login']);
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Auth/login']);
    return false;

  }
}




