import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/Service/Performance/OrganizationService/organization.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';
import { PayrollService } from '../../../../../Service/PayRoll/payroll.service';

@Component({
  selector: 'app-generate-p9form',
  templateUrl: './generate-p9form.component.html',
  styleUrls: ['./generate-p9form.component.scss']
})
export class GenerateP9formComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: any;
  loading = false;
  error: any;
  item: any
  message: any;
  messageSubscription! : Subscription;
  subscription! : Subscription;
  resData: any;
  constructor(
    private _snackBar: MatSnackBar,
    private reportAPI: ReportService,
    private router: Router,
    public fb: FormBuilder,
    private payrollAPI:PayrollService,
    private organizationAPI: OrganizationService
  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(){
  this.messageSubscription.unsubscribe();
  this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    year: ["",  [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4),Validators.maxLength(4) ]],
    employers_pin: ['',[Validators.required]],
    employers_name: ['',[Validators.required]]
  });

  public initForm(){
    let id = 1;
      this.organizationAPI.getOrganization(id).subscribe(res=>{
      this.resData = res;
      this.formData = this.fb.group({
        year: [""],
        employers_pin: [this.resData.organization_kra_pin],
        employers_name: [this.resData.organization_name]
      })
    });
  }
  get f() { return this.formData.controls; }

  getEmployeeYearlyReport() {
  this.messageSubscription =  this.payrollAPI.currentMessage.subscribe(res=>{
    this.message = res;
    this.loading = true;
    let id_no = this.message.id_no
    let Employers_name =  this.formData.controls.employers_name.value
    let Employers_pin = this.formData.controls.employers_pin.value
    let period_y = this.formData.controls.year.value
    const params = new HttpParams()
      .set('period_y', period_y)
      .set('id_no', id_no)
      .set('Employers_name',  Employers_name)
      .set('Employers_pin', Employers_pin)

     this.subscription = this.reportAPI.generateEmployeeP9form(params).subscribe(response => {
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.loading = false;
      this._snackBar.open("Report Genareted Successfully Updated!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      this.initForm();
      this.router.navigateByUrl('administration/employees/p9form');
    }, err => {
      this.error = err
      this.loading = false;
      this._snackBar.open("Data for year "+ period_y +" Are currently not available!", "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
  })
  }
}
