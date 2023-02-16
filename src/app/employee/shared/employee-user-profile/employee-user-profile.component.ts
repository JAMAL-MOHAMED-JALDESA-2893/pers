import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-user-profile',
  templateUrl: './employee-user-profile.component.html',
  styleUrls: ['./employee-user-profile.component.scss']
})
export class EmployeeUserProfileComponent  implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  subscription!:Subscription;
  hide = true;
  employeeData: any;
  error = '';
  approveData: any;
  requestData: any;
  employeeLeaveId: any;
  employeeFirstName: any;
  employeeMiddleName: any;
  employeeLastName: any;
  employee: any;
  headExecutive: any;
  personalEmail: any;
  personalPhone: any;
  reportingTo: any;
  specialNeedDescription: any;
  specialNeeds: any;
  workMail: any;
  createdAt: any;
  directorApproval: any;
  endDate: any;
  leaveType: any;
  reason: any;
  startDate: any;
  status: any;
  supervisorApproval: any;
  updatedAt: any;
  completedData: any;
  role: any;
  dataRes: any;
  employeePhone: any;
  employeeEmail: any;
  employeeWorkEmail: any;
  departmentName: any;
  occupation: any;
  params:any;
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;



  constructor(
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    public fb: FormBuilder,
    private ngZone: NgZone,
    ) {}

  ngOnInit() {
    this.getData();
  }
  formData = this.fb.group({
    password: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required]],
  },{validator: this.checkIfMatchingPassword('password', 'confirmpassword')});
  checkIfMatchingPassword(password: string, confirmpassword: string){
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
      confirmpasswordInput = group.controls[confirmpassword];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({notEquivalent: true})
      }
      else {
          return confirmpasswordInput.setErrors(null);
      }
    }
  }
  ngOnDestroy(): void {}

  getData(){
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  let employee_id = currentUser.id;
  this.subscription = this.employeeAPI.getEmployeeId(employee_id).subscribe(res=>{
    this.employeeData = res;
    console.log("employee data", res)
  
    this.employeeFirstName = this.employeeData.firstName;
    this.employeeMiddleName = this.employeeData.middleName;
    this.employeeLastName = this.employeeData.lastName;
    this.employeePhone = this.employeeData.personalPhone;
    this.employeeEmail = this.employeeData.personalEmail;
    this.employeeWorkEmail = this.employeeData.workMail;
    this.occupation = this.employeeData.occupation;



    

    // this.firstName =



  })
  }

  get f() { return this.formData.controls; }

  onSubmit() {
    
    this.loading = true;
    var password = Math.random().toString(36).slice(-8);
    const data = this.formData.value;
    this.params = new HttpParams()
    .set('email', this.employeeEmail)
    .set('password', this.f.password.value);
    let API_URL = `${environment.apiUrl}/api/auth/password/reset/`;
    return this.http.put(API_URL,{},{params: this.params, headers: this.headers, withCredentials: false }).subscribe(results  => {
    this.loading = false;
                this._snackBar.open("Password Reset Successfully  Check your Email!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                });
    
    },error => {
      this.loading = false;
          this._snackBar.open(error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
    
      });
    
    
    }
    
}
