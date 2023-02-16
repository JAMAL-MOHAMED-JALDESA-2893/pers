import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-update-advance-parameter',
  templateUrl: './update-advance-parameter.component.html',
  styleUrls: ['./update-advance-parameter.component.scss']
})
export class UpdateAdvanceParameterComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  subscription!: Subscription;
  data: any;
  id: any;
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
    max_salary_percentage: [],
    min_salary_percentage: [],
  });
  ngOnInit() {
    this.getData();
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getData(){
    this.id = 1
    this.subscription = this.advanceSalaryParamsAPI.getAdvanceSalaryParamId(this.id).subscribe( res=>{
      this.data = res;
      this.formData = this.fb.group({
        max_salary_percentage: [this.data.max_salary_percentage * 100],
        min_salary_percentage: [this.data.min_salary_percentage * 100],
      });
    },err=>{
    })
  }
  submitData() {
if(this.formData.valid){
  this.id = 1
  this.advanceSalaryParamsAPI.updateAdvanceSalaryParam(this.id,this.formData.value).pipe(first())
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
