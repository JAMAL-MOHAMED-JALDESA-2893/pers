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
import { EmailConfigurationService } from '../email-configuration.service';

@Component({
  selector: 'app-update-email-configuration',
  templateUrl: './update-email-configuration.component.html',
  styleUrls: ['./update-email-configuration.component.scss']
})
export class UpdateEmailConfigurationComponent implements   OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  email_organization_location: any;
  subcription: any;
  data: any;
  id: any;
  email_type: any;
  email_salutation: any;
  email_subject: any;
  email_heading: any;
  email_message: any;
  email_remarks: any;
  email_regards_from: any;
  email_organization_name: any;
  email_organization_phone: any;
  email_organization_mail: any;
  email_organization_address: any;
  email_organization_website: any;
  constructor(
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private emailConfigAPI: EmailConfigurationService,
    private tokenStorage: TokenStorageService
    ) { }

    emailTypeArray: any = [
      'Employee_Report','Dummy_Payroll_Report','Commited_Payroll_Report','Account_Creation','Password_reset'
    ]

  formData = this.fb.group({
    email_type: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_salutation: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_subject: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(300)]],
    email_heading: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_message: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(600)]],
    email_remarks: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_regards_from: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_organization_name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_organization_phone: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(100)]],
    email_organization_mail: ['', [Validators.email, Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_organization_address: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_organization_location: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
    email_organization_website: ['', [Validators.required]]
  });

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subcription = this.emailConfigAPI.getEmailconfigId(id).subscribe(res=>{
      this.data = res;
      this.id = id;
      this.email_type = this.data.email_type;
      this.email_salutation = this.data.email_salutation;
      this.email_subject = this.data.email_subject;
      this.email_heading = this.data.email_heading;
      this.email_message = this.data.email_message;
      this.email_remarks = this.data.email_remarks;
      this.email_regards_from = this.data.email_regards_from;
      this.email_organization_name = this.data.email_organization_name;
      this.email_organization_phone = this.data.email_organization_phone;
      this.email_organization_mail = this.data.email_organization_mail;
      this.email_organization_address = this.data.email_organization_address;
      this.email_organization_location = this.data.email_organization_location;
      this.email_organization_website = this.data.email_organization_website;
      this.formData = this.fb.group({
        email_type: [this.email_type],
        email_salutation: [this.email_salutation],
        email_subject: [this.email_subject],
        email_heading: [this.email_heading],
        email_message: [this.email_message],
        email_remarks: [this.email_remarks],
        email_regards_from: [this.email_regards_from],
        email_organization_name: [this.email_organization_name],
        email_organization_phone: [this.email_organization_phone],
        email_organization_mail: [this.email_organization_mail],
        email_organization_address: [this.email_organization_address],
        email_organization_location: [this.email_organization_location],
        email_organization_website: [this.email_organization_website]
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
    const id = this.actRoute.snapshot.paramMap.get('id');
if(this.formData.valid){
  this.emailConfigAPI.updateEmailconfig(id, this.formData.value).pipe(first())
  .subscribe(
    result => {
        this._snackBar.open("Email Configuration set Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
          this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/set/email'));
      },
      err=> {
        console.log("hey error", err)
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

}
