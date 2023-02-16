import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Department } from 'src/@core/Models/Department/department.model';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-advance-parameter',
  templateUrl: './create-advance-parameter.component.html',
  styleUrls: ['./create-advance-parameter.component.scss']
})
export class CreateAdvanceParameterComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  constructor(
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private advanceSalaryParamsAPI: AdvanceSalaryParamsService,
    private tokenStorage: TokenStorageService
    ) { }
  formData = this.fb.group({
    max_salary_percentage: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(3)]],
    min_salary_percentage: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(3)]],
  });
  ngOnInit() {
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  submitData() {
if(this.formData.valid){
  this.advanceSalaryParamsAPI.createAdvanceSalaryParams(this.formData.value).pipe(first())
  .subscribe(
    result => {

        this._snackBar.open("Parameter Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
          this.ngZone.run(() => this.router.navigateByUrl('administration/employee/advance/salary/params'));
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
