import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit, OnDestroy {

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
    ) { }
  formData = this.fb.group({
    departmentName: ['', [Validators.required]],
    departmentMail: ['']
  });

  ngOnInit() {
    this.initForm();
  }
  // init form values

  public initForm(){
     this.formData = this.fb.group({
    departmentName: ['', [Validators.required]],
    departmentMail: ['', [Validators.required]]
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
  this.departmentAPI.createDepartment(this.formData.value).pipe(first())
  .subscribe(
    result => {
        this._snackBar.open("Department Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
          this.ngZone.run(() => this.router.navigateByUrl('administration/departments'));
      },
      err=> {
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
