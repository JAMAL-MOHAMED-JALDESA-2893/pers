import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Department } from 'src/@core/Models/Department/department.model';
import { AllowanceService } from 'src/app/Service/AllowanceService/allowance.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-custom-allowance',
  templateUrl: './add-custom-allowance.component.html',
  styleUrls: ['./add-custom-allowance.component.scss']
})
export class AddCustomAllowanceComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  subscription!: Subscription;
  employeesData: any;


  constructor(
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private allowanceAPI: AllowanceService,
    private employeeAPI: EmployeeService,
    private tokenStorage: TokenStorageService
  ) { }


  formData = this.fb.group({
    employee_id: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    allowance_for: ['', [Validators.required]],
    is_taxable: ['']
  });

  ngOnInit() {
    this.getEmployees();
    this.formData = this.fb.group({
      employee_id: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      allowance_for: ['', [Validators.required]],
      is_taxable: ['false']
    });
  }
  // init form values

  getEmployees() {
    this.subscription = this.employeeAPI.getActiveEmployees().subscribe(res => {
      this.employeesData = res;
    }, err => {
      this.error = err;
    })
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
    if (this.formData.valid) {
      this.allowanceAPI.createAllowance(this.formData.value).pipe(first())
        .subscribe(
          result => {
            this._snackBar.open("Executed Successfully!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowances'));
          },
          err => {
            console.log("hey error", err)
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          });

    } else {
      this._snackBar.open("Invalid Form data", "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }
  onDelete(id: any) {
    // if (window.confirm('Are you sure to delete?')) {
    //   this.employeeAPI.deleteEmployee(id).subscribe(res => {
    //     // call to destro an instance
    //     this.ngOnDestroy();
    //     // call to reinitialize the table
    //     this.ngOnInit();
    //   })
    // }
  }

}
