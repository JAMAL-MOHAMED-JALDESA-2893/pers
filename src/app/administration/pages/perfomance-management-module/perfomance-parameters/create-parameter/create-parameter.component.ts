import { HttpParams } from "@angular/common/http";
import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ParametersService } from "src/app/Service/Performance/PerfomanceParams/parameters.service";


@Component({
  selector: 'app-create-parameter',
  templateUrl: './create-parameter.component.html',
  styleUrls: ['./create-parameter.component.scss']
})
export class CreateParameterComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private parameterAPI: ParametersService,
    ) { }


  formData = this.fb.group({
    parameter_name: ['', [Validators.required]],
    measurement_type: ['', [Validators.required]],
    max_target: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(3)]],
    ave_target: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(3)]],
    min_target: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(3)]]
  });

  ngOnInit() {

  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }



  submitData() {

if(this.formData.valid){

  this.parameterAPI.createParameters(this.formData.value).subscribe(
    result => {
        this._snackBar.open("Parameter Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.ngZone.run(() => this.router.navigateByUrl('administration/employee/perfomance/management/parameters'));
      },
      err=> {
        console.log("hey error", err)
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
      });

    }else{
this._snackBar.open("Invalid Form data", "Try again!", {
  horizontalPosition: this.horizontalPosition,
  verticalPosition: this.verticalPosition,
  duration: 3000,
  panelClass: ['red-snackbar','login-snackbar'],
});
    }
  }

}
