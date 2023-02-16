import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Department } from 'src/@core/Models/Department/department.model';
import { AdvanceSalaryService } from 'src/app/Service/AdavanceSalary/advance-salary.service';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apply-advance',
  templateUrl: './apply-advance.component.html',
  styleUrls: ['./apply-advance.component.scss']
})
export class ApplyAdvanceComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  transitForm: any;
  constructor(
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private advanceSalaryParamsAPI: AdvanceSalaryParamsService,
    private advanceSalaryAPI: AdvanceSalaryService,
    private tokenStorage: TokenStorageService
    ) { }
  formData = this.fb.group({
    salary_amount: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(10)]],
  });
  ngOnInit() {
    console.log("in apply advance");
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
    
    console.log("submitData()");
if(this.formData.valid){

  var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  var d = new Date();
  let currentMonth = monthNames[d.getMonth()]
  let currentYear = d.getFullYear();
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  const employee_id = currentUser.id;
  this.transitForm = this.fb.group({
    employee_id:employee_id ,
    salary_amount: this.f.salary_amount.value,
    month:currentMonth,
    year:currentYear
  });
  
  this.advanceSalaryAPI.createAdvanceSalary(this.transitForm.value).pipe(first())
  .subscribe(
    result => {
        this._snackBar.open("Advanced Salary applied Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
          this.ngZone.run(() => this.router.navigateByUrl('/portal/employee/advance/salary'));
      },
      err=> {
          this.error = err;
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('/portal/employee/advance/salary'));
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
