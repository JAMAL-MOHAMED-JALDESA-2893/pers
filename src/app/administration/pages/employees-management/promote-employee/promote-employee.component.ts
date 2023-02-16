import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Department } from 'src/@core/Models/Department/department.model';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promote-employee',
  templateUrl: './promote-employee.component.html',
  styleUrls: ['./promote-employee.component.scss']
})
export class PromoteEmployeeComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  employeeData: any;
  subscription!: Subscription
  constructor(
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private employeeAPI: EmployeeService,
  ) { }
  formData = this.fb.group({
    new_position: ['', [Validators.required]],
    new_basic_pay: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    is_executive: [''],
    is_head_of_department: ['']
  });
  ngOnInit() {
    this.initForm();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.dtTrigger.unsubscribe();
  }
  // init form values
  initForm() {
    this.formData = this.fb.group({
      new_position: ['', [Validators.required]],
      new_basic_pay: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      is_executive: [''],
      is_head_of_department: ['']
    });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }
  submitData() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (this.formData.valid) {
      this.employeeAPI.promoteEmployee(id, this.formData.value).pipe(first())
        .subscribe(
          result => {
            this._snackBar.open("Employee promoted successfully.", "OK", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('administration/employees/promotions'));
          },
          error => {
            this.error = error.message;
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
