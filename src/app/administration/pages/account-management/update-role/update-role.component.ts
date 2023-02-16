import { LeaveTypeService } from '../../../../Service/LeaveType/leave-type.service';
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
import { TokenStorageService } from 'src/app/Service/token-storage.service';



@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  rolesArray: any = [
    // 'ROLE_ADMIN',
	  // 'ROLE_USER',
    // 'ROLE_EMPLOYEE',
    // 'ROLE_DIRECTOR',
    // 'ROLE_SUPERVISOR',

    // 'ROLE_ADMIN',
    'ROLE_DIRECTOR',
    'ROLE_HR',
    'ROLE_SUPERVISOR',
    'ROLE_USER',
    'ROLE_MODERATOR'
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
    private leaveTypeAPI: LeaveTypeService,
    private leaveAPI: LeaveService,
    private salaryAPI: SalaryService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private actRoute: ActivatedRoute,
    private authAPI: AuthService
    ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
    }


  formData = this.fb.group({
    email: ['', [Validators.required]],
    role: ['', [Validators.required]],

  });

  ngOnInit() {

    this.getLeavesTypeArray();
    this.initForm();
  }
  getAccountData(){
    const email = this.actRoute.snapshot.paramMap.get('email');
    console.log("get email from snapshot", email)
    this.authAPI.GetAccountsByEmail(email).subscribe(re=>{

    })

  }
  dataArray: any;
  getLeavesTypeArray(){
   this.leaveTypeAPI.getLeavesTypes().subscribe(data => {
     this.dataArray = data;

   });
  }
  // init form values

  public initForm(){
    // call
    const email = this.actRoute.snapshot.paramMap.get('email');
    this.authAPI.GetAccountsByEmail(email).subscribe(res=>{
      this.formData = this.fb.group({
        email: [res.email, [Validators.required]],
        role: ['', [Validators.required]],
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
    console.log("Hey it works", this.formData.value)
   this.loading = true;
   if (window.confirm('Are you sure you want to change roles for this employee?')) {
    if(this.formData.valid){
      console.log("Hey it works", this.formData.value)
      const email = this.f.email.value;
      const role =  this.f.role.value;
      const params = new HttpParams()
      .set('email',email)
    .set('role', role);
      this.authAPI.updateRole(params).pipe(first())
      .subscribe(
        result => {
          this.loading = false;
            this._snackBar.open("Role Successfully Updated!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar','login-snackbar'],
            });
              this.ngZone.run(() => this.router.navigateByUrl('administration/accounts'));
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

