import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Department } from 'src/@core/Models/Department/department.model';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit, OnDestroy {

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
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService
    ) { }

  formData = this.fb.group({
    departmentName: ['', [Validators.required]],
    // headOfDepartment: ['', [Validators.required]],
    // directorOfDepartment: ['', [Validators.required]],
    departmentMail: ['', [Validators.required]]
  });

  ngOnInit() {
    this.initForm();
  }
  // init form values
  public initForm(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    return this.departmentAPI.getDepartmentId(id).subscribe( data => {


      this.formData = this.fb.group({
     departmentName: [data.departmentName, [Validators.required]],
    //  headOfDepartment: [data.headOfDepartment, [Validators.required]],
    //  directorOfDepartment: [data.directorOfDepartment, [Validators.required]],
     departmentMail: [data.departmentMail, [Validators.required]]
   });



   
 })}
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  submitData() {
    const id = this.actRoute.snapshot.paramMap.get('id');
if(this.formData.valid){
  this.departmentAPI.updateDepartment(id, this.formData.value).pipe(first())
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
      error => {
          this.error = error.message;
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
