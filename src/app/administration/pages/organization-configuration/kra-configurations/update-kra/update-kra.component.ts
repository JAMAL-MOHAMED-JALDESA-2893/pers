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
  selector: 'app-update-kra',
  templateUrl: './update-kra.component.html',
  styleUrls: ['./update-kra.component.scss']
})
export class UpdateKraComponent implements   OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  kraBandArray: any = [
    'First Salary','Next Salary','In Excess of Amount'
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
  data: any;


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
    tax_band: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(30)]],
    amount_annual: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
    amount_monthly: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
    rate: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.required, Validators.minLength(1),Validators.maxLength(2)]],
    personal_relief_monthly: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
    personal_relief_annualy: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
  });

  ngOnInit() {
    this.initForm();
  }


  // init form values

  public initForm(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.kraAPI.getKraById(id).subscribe( res=>{
      this.data = res;
      this.formData = this.fb.group({
        tax_band: [this.data.tax_band],
        amount_annual: [this.data.amount_annual],
        amount_monthly: [this.data.amount_monthly],
        rate: [this.data.rate],
        personal_relief_monthly: [this.data.personal_relief_monthly],
        personal_relief_annualy: [this.data.personal_relief_annualy],
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
   if (window.confirm('Are you sure you want to Update this tax?')) {
    if(this.formData.valid){
      this.kraAPI.updateKra(id, this.formData.value).pipe(first())
      .subscribe(
        result => {
          this.loading = false;
            this._snackBar.open("Role Successfully Updated!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar','login-snackbar'],
            });
              this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/kra'));
          },
          error => {
              this.error = error.message;
          });

        }else{
          this.loading = false;
    this._snackBar.open("Invalid Form data", "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
        }
      }
  }
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

