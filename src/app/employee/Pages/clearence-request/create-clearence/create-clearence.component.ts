import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ClearenceService } from "src/app/Service/ClearenceService/clearence.service";
import { EmployeeService } from "src/app/Service/EmployeeService/employee.service";


@Component({
  selector: 'app-create-clearence',
  templateUrl: './create-clearence.component.html',
  styleUrls: ['./create-clearence.component.scss']
})
export class CreateClearenceComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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

  exit_date = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  selecteddate: any;
  fomatedDate: any;
  fomartedDate: any;
  currentUser: any;
  employee_id: any;
  departmentId: any;


  constructor(
    private clearenceAPI: ClearenceService,
    private employeeAPI: EmployeeService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe
    ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 0, 0);
    }
  formData = this.fb.group({
    employee_id: ['', [Validators.required]],
    department_id:[''],
    reason: ['', [Validators.required]],
    exit_date: ['', [Validators.required]],
  });
  ngOnInit() {
    this.initForm();
  }
  // init form values

  public initForm(){
    this.formData = this.fb.group({
      employee_id: ['', [Validators.required]],
      department_id:[''],
      reason: ['', [Validators.required]],
      exit_date: ['', [Validators.required]],
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
  onSubmit(){
    console.log("form data", this.formData.value)
   if (window.confirm('Are you sure you want to Resign? If OK, this process is subjected to our organization policy and core values,it has no reverse whatsoever!')) {
     this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
     this.employee_id = this.currentUser.id;
    //  get employee data by id
    this.employeeAPI.getEmployeeId(this.employee_id).subscribe(res =>{
      this.departmentId = res.departmentId;

      this.selecteddate =  this.f.exit_date.value,
      // this.fomartedDate = this.selecteddate.split("/").reverse().join("-");
      this.fomartedDate  =this.datepipe.transform(this.selecteddate, 'yyyy-MM-ddTHH:mm:ss');
      let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      const employee_id = currentUser.id;
      this.requestParam = this.fb.group({
              employee_id: employee_id,
             department_id:this.departmentId,
        reason: this.f.reason.value,
        exit_date: this.fomartedDate,
      });
      this.clearenceAPI.createClearence(this.requestParam.value).subscribe( data=> {
        this._snackBar.open("Resignation Successfully Applied!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });

        this.ngZone.run(() => this.router.navigateByUrl('portal/clearence'));
      }, err => {
        this.error = err;
        this._snackBar.open("!" + this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })

    });


  }
}


}
