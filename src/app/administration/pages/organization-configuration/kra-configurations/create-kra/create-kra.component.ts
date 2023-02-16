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
import { KraConfigService } from 'src/app/Service/KraConfigurations/kra-config.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-create-kra',
  templateUrl: './create-kra.component.html',
  styleUrls: ['./create-kra.component.scss']
})
export class CreateKraComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  kraBandArray: any = [
    'First Salary', 'Next Salary', 'In Excess of Amount'
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
    private kraAPI: KraConfigService,
    private authAPI: AuthService
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
  }


  formData = this.fb.group({
    tax_band: ['',Validators.required],
    amount_annual: ['', Validators.required],
    amount_monthly: ['', Validators.required],
    rate: ['', Validators.required],
    personal_relief_monthly: ['', Validators.required],
    personal_relief_annualy: ['', Validators.required],
  });
  
  initForm() {
   // call
   this.formData = this.fb.group({
     tax_band: [''],
     amount_annual: [''],
     amount_monthly: [''],
     rate: [''],
     personal_relief_monthly: [''],
     personal_relief_annualy: [''],
   });
  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  ngOnInit() {
  }
  
  get f() { return this.formData.controls; }

  submitData() {
    this.loading = true;
    if (this.formData.valid) {
      if (window.confirm('Are you sure you want to add this tax?')) {
        if (this.formData.valid) {
          this.kraAPI.createKra(this.formData.value).pipe(first())
            .subscribe(
              result => {
                this.loading = false;
                this._snackBar.open("KRA Tax band configuration added successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/kra'));
              },
              error => {
                this.error = error;
                this.loading = false;
                this._snackBar.open("this.error", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to add KRA tax band!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      }
    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Please provide a valid KRA TAX information to submit!!", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    }
  }


  // submitData() {
  //   if (this.formData.value) {
  //     console.log("Hey it works", this.formData.value)
  //     this.loading = true;
  //     if (window.confirm('Are you sure you want to add this tax?')) {
  //       if (this.formData.valid) {
  //         this.kraAPI.createKra(this.formData.value).pipe(first())
  //           .subscribe(
  //             result => {
  //               this.loading = false;
  //               this._snackBar.open("KRA tax band configuration added successfully", "OK", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['green-snackbar', 'login-snackbar'],
  //               });
  //               this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/kra'));
  //             },
  //             error => {
  //               this.loading = false;
  //               this.error = error;
  //               console.log(error);
  //               this._snackBar.open("this.error", "TX", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['red-snackbar', 'login-snackbar'],
  //               });
  //             });

  //       } else {
  //         this.loading = false;
  //         this._snackBar.open("Invalid Form data", "Try again!", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: 3000,
  //           panelClass: ['red-snackbar', 'login-snackbar'],
  //         });
  //       }
  //     }

  //   } else if (!this.formData.valid) {
      
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

