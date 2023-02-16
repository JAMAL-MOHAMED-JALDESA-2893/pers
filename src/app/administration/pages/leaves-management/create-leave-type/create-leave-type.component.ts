import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { LeaveTypeService } from 'src/app/Service/LeaveType/leave-type.service';

@Component({
  selector: 'app-create-leave-type',
  templateUrl: './create-leave-type.component.html',
  styleUrls: ['./create-leave-type.component.scss']
})
export class CreateLeaveTypeComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;


  constructor(
    private leaveTypeAPI: LeaveTypeService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
    ) { }

  formData = this.fb.group({
    leaveType: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    deductionPercentage: ['', [Validators.required]],   
    created_at: [new Date()]
  });

  ngOnInit() {

    this.initForm();

  }
  // init form values

  public initForm(){
     this.formData = this.fb.group({
    leaveType: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    deductionPercentage: ['', [Validators.required]],
    created_at: [new Date()]

    // check for valid number and value range ie: [0-20]
// var numberControl = new FormControl("", CustomValidators.number({min: 0, max: 20}))

    // grossPay: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  });

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

  this.leaveTypeAPI.createLeaveType(this.formData.value).pipe(first())
  .subscribe(
    result => {
console.log("leavetype data:", this.formData);

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
