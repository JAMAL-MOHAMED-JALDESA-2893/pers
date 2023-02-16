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
import { TokenStorageService } from 'src/app/Service/token-storage.service';


@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
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
    ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
    }


  formData = this.fb.group({
    leave_type_id: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    employee_reason_for_leave: ['', [Validators.required]],
    employeeId: [''],
  });


  ngOnInit() {

    this.getLeavesTypeArray();
    this.initForm();
  }
  dataArray: any;
  getLeavesTypeArray(){
   this.leaveTypeAPI.getEnabledLeavesTypes().subscribe(data => {
     this.dataArray = data;

   });
  }
  // init form values

  public initForm(){

    this.requestData = this.fb.group({
      leave_type_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      employee_reason_for_leave: ['', [Validators.required]],
      employeeId: [''],
    });

  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.requestData.controls; }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;
  submitData() {
if(this.requestData.valid){
  console.log("applyleave:", this.requestData);
  
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  console.log("hey user", currentUser)
  const employee_id = currentUser.id;
  console.log("employee id", employee_id)
  // this.f.username.value, this.f.password.value
this.requestParam = this.fb.group({
  leave_type_id: this.f.leave_type_id.value,
  start_date: this.f.start_date.value.toLocaleDateString(),
  end_date: this.f.end_date.value.toLocaleDateString(),
  employee_reason_for_leave: this.f.employee_reason_for_leave.value,
  employeeId:employee_id
});

  this.leaveAPI.createEmployeeLeave(this.requestParam.value).pipe(first())
  .subscribe(
    result => {
      this._snackBar.open("Leave Successfully Applied!", "X", {
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
