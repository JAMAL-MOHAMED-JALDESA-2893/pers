import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { LeaveTypeService } from 'src/app/Service/LeaveType/leave-type.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-update-leave-type',
  templateUrl: './update-leave-type.component.html',
  styleUrls: ['./update-leave-type.component.scss']
})
export class UpdateLeaveTypeComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  subscripription!:Subscription;
  id = this.actRoute.snapshot.paramMap.get('id');
  results: any;

  constructor(
    private departmentAPI: DepartmentService,
    private leaveTypeAPI: LeaveTypeService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService
    ) { }

  formData = this.fb.group({
    leaveType: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    deductionPercentage: ['', [Validators.required]]
  });

  ngOnInit() {

    this.initForm();

  }
  // init form values

  public initForm(){
    this.subscripription =  this.leaveTypeAPI.getLeaveTypeId(this.id).subscribe(res=>{
      this.results = res;
      this.formData = this.fb.group({
        leaveType: [this.results.leaveType, [Validators.required]],
        duration: [this.results.duration, [Validators.required]],
        deductionPercentage: [this.results.deductionPercentage, [Validators.required]]
      });
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
if(this.formData.valid){
  this.leaveTypeAPI.updateLeaveType(this.id, this.formData.value).pipe(first())
  .subscribe(
    result => {

        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
          this.ngZone.run(() => this.router.navigateByUrl('administration/leaves/type'));
      },
      error => {
          this.error = error;
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
