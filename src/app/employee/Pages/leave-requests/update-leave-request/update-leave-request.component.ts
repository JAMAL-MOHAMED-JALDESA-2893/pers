import { LeaveTypeService } from '../../../../Service/LeaveType/leave-type.service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-update-leave-request',
  templateUrl: './update-leave-request.component.html',
  styleUrls: ['./update-leave-request.component.scss']
})
export class UpdateLeaveRequestComponent  implements OnInit, OnDestroy {
  panelOpenState = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  leaveTypeArray: any = [
    'Bereavement Leave', 'Maternity Leave','Medical Leave', 'Caretaker Leave'
  ];
  hodArray: any = [
    'Head of Procurement', 'Head of ICT','Head of Public Service', 'Head of Accounts',"Head of Human Resource"
  ];
  monthsArray: any = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];

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
  results: any;


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
    ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
    }


  formData = this.fb.group({
    leave_type_id: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    employeeReasonForLeave: ['', [Validators.required]],
    employeeId: [''],
  });


  ngOnInit() {

    this.getLeavesTypeArray();
    this.initForm();
  }



  getData() {
    const id = this.actRoute.snapshot.paramMap.get('id');

    // let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    // const  employee_id  = currentUser.id;
    // this.leaveAPI.getLeavesByEmployeeId(employee_id).subscribe(res=>{
    //   this.employeeLeaves = res;
    //
    // }, err=>{
    // });
  }

  dataArray: any;
  getLeavesTypeArray(){
   this.leaveTypeAPI.getEnabledLeavesTypes().subscribe(data => {
     this.dataArray = data;

   });
  }
  // init form values

  public initForm(){
    const id = this.actRoute.snapshot.paramMap.get('id');
 this.leaveAPI.getEmployeeLeaveId(id).subscribe(res=>{
   console.log("this is the respond", res)
   this.results = res;
  //  leave.id = this.results.leave_type_id;



this.formData = this.fb.group({
  leave_type_id: [this.results.leave_type_id, [Validators.required]],
  startDate: [this.results.startDate, [Validators.required]],
  endDate: [this.results.endDate,[Validators.required]],
  employeeReasonForLeave: [this.results.employeeReasonForLeave, [Validators.required]],
  employeeId: [''],
});

 },err=>{

  this.error = err;;
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
headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;

  submitData() {
    const id = this.actRoute.snapshot.paramMap.get('id');


if(this.formData.valid){
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  console.log("hey user", currentUser)
  const employee_id = currentUser.id;
  console.log("employee id", employee_id)
  // this.f.username.value, this.f.password.value
this.requestParam = this.fb.group({
  leave_type_id: this.f.leave_type_id.value,
  startDate: this.f.startDate.value,
  endDate: this.f.endDate.value,
  employeeReasonForLeave: this.f.employeeReasonForLeave.value,
  employeeId:employee_id
});

console.log("this is the request param values",this.requestParam.value )
  this.leaveAPI.employeeUpdateEmployeeLeave(id, this.requestParam.value).pipe(first())
  .subscribe(
    result => {
      this._snackBar.open("Successful!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
          this.ngZone.run(() => this.router.navigateByUrl('portal/leave/requests'));
      },
      error => {
          this.error = error;
          console.log("Clientside", this.error);
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
