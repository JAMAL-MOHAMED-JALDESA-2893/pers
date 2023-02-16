import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { map } from 'jquery';
import { Subject } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { NhifConfigService } from 'src/app/Service/NhifConfigurations/nhif-config.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-update-tax-band',
  templateUrl: './update-tax-band.component.html',
  styleUrls: ['./update-tax-band.component.scss']
})
export class UpdateTaxBandComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  rolesArray: any = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_EMPLOYEE',
    'ROLE_DIRECTOR',
    'ROLE_SUPERVISOR',
    // 'ROLE_HR'
  ]
  error = '';
  loading = false;
  salaryData: any;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  employeeData: any;
  reportingTo: any;
  minDate: Date;
  maxDate: Date;
  constructor(
    private employeeAPI: EmployeeService,
    private leaveAPI: LeaveService,
    private salaryAPI: SalaryService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private actRoute: ActivatedRoute,
    private nhifAPI: NhifConfigService,
    private authAPI: AuthService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
  }
  formData = this.fb.group({
    tax_band: ['', Validators.required],
    min_threshold: ['', Validators.required],
    max_threshold: ['', Validators.required],
    nhif_deduction: ['', Validators.required],
  });
  ngOnInit() {
    this.initForm();
  }
  // init form values
  public initForm() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.nhifAPI.getNhifById(id).subscribe(res => {
      this.formData = this.fb.group({
        tax_band: [res.tax_band, Validators.required],
        min_threshold: [res.min_threshold, Validators.required],
        max_threshold: [res.max_threshold, Validators.required],
        nhif_deduction: [res.nhif_deduction, Validators.required],
      });
    })
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  get f() { return this.formData.controls; }

  submitData() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.loading = true;
    if (this.formData.valid) {
      if (window.confirm('Are you sure you want to UPDATE NHIF TAX?')) {
        if (this.formData.valid) {
          this.nhifAPI.updateNhif(id, this.formData.value).pipe(first())
            .subscribe(
              result => {
                this.loading = false;
                this._snackBar.open("NHIF Tax band configuration UPDATED successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nhif'));
              },
              error => {
                this.loading = false;
                this._snackBar.open("ERROR! Failed to add NHIF tax band!!", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to UPDATE NHIF tax band!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      }
    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Please provide a valid NHIF TAX information to submit!!", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    }
  }
  // submitData() {
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //   this.loading = true;
  //   if (window.confirm('Are you sure you want to add this tax?')) {
  //     if (this.formData.valid) {
  //       this.nhifAPI.updateNhif(id, this.formData.value).pipe(first())
  //         .subscribe(
  //           result => {
  //             this.loading = false;
  //             this._snackBar.open("Role Successfully Updated!", "X", {
  //               horizontalPosition: this.horizontalPosition,
  //               verticalPosition: this.verticalPosition,
  //               duration: 3000,
  //               panelClass: ['green-snackbar', 'login-snackbar'],
  //             });
  //             this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nhif'));
  //           },
  //           error => {
  //             this.error = error
  //           });
  //     } else {
  //       this.loading = false;
  //       this._snackBar.open(this.error, "Try again!", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: 3000,
  //         panelClass: ['red-snackbar', 'login-snackbar'],
  //       });
  //     }
  //   }
  // }
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.employeeAPI.deleteEmployee(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }

}

