import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { ClearenceService } from "src/app/Service/ClearenceService/clearence.service";
import { LeaveService } from "src/app/Service/LeaveService/leave.service";
import { LeaveTypeService } from "src/app/Service/LeaveType/leave-type.service";
import { TokenStorageService } from "src/app/Service/token-storage.service";


@Component({
  selector: 'app-updated-clearence',
  templateUrl: './updated-clearence.component.html',
  styleUrls: ['./updated-clearence.component.scss']
})
export class UpdatedClearenceComponent implements  OnInit, OnDestroy {

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
  clearenceData: any;


  constructor(
    private leaveTypeAPI: LeaveTypeService,
    private clearenceAPI: ClearenceService,
    private leaveAPI: LeaveService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
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
    // this.initForm();
  }
  // initForm() {
  //   let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  //   console.log("employee id", currentUser );
  //   const employee_id = currentUser.id;
  //   console.log("employee id", employee_id );
  //   this.clearenceAPI.getClearenceByEmployeeId(employee_id).subscribe(data => {
  //     console.log("Hey responded data", data);
  //     this.clearenceData = data;
  //     this.formData = this.fb.group({
  //       employee_id: [''],
  //       department_id:[''],

  //       reason: [this.clearenceData.reason],
  //       exit_date: [this.clearenceData.exit_date],
  //     });
  //   })
  // }
  // init form values
  // public initForm(){
  //   this.formData = this.fb.group({
  //     employee_id: ['', [Validators.required]],
  //     department_id:[''],
  //     reason: ['', [Validators.required]],
  //     exit_date: ['', [Validators.required]],
  //   });
  // }
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
    this.selecteddate =  this.f.exit_date.value,
    this.fomartedDate = this.selecteddate.split("/").reverse().join("-");
    // this.fomartedDate  =this.datepipe.transform(this.selecteddate, 'yyyy-MM-dd');
    this.fomartedDate  =this.datepipe.transform(this.selecteddate, 'yyyy-MM-ddTHH:mm:ss');
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    const employee_id = currentUser.id;
    this.requestParam = this.fb.group({
      employee_id: 5,
      department_id:5,
      reason: this.f.reason.value,
      exit_date: this.fomartedDate,
    });
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.clearenceAPI.updateClearence(id, this.requestParam.value).subscribe( data=> {
      this._snackBar.open("Resignation Successfully Updated!", "X", {
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
  }
}


}
