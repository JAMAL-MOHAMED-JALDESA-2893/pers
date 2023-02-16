import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BatchService } from 'src/app/Service/BatchService/batch.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: any;
  newid: any;
  loading = false;
  subscription: Subscription = new Subscription;
  eventTypeArray: any = [
    'Open_Salary',
    'Generate_Dummy_Payroll',
    'Sent_Dummy_Payroll_Notification_Mail_Report',
    'Close_Payroll_Generation',
    'Close_and_commit_Salary',
    'Sent_Actual_Payroll_Notification_Mail_Report',
    'Sent_P9form_and_Payslip_Reports_Mail'
  ]
  error: any; 
  // constructor(
  //   private actRoute: ActivatedRoute,) { }
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fb: FormBuilder,
      private dialog: MatDialog,
      private router: Router,
      private ngZone: NgZone,
      private actRoute: ActivatedRoute,
      private parameterAPI: ParametersService,
      private goalAPI: GoalService,
      private _snackBar: MatSnackBar,
      private batchAPI: BatchService,
      private replyAPI: ReplyService
      ) {}
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    event_type: [''],
    execution_date: ['',[Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(2)]]
  });
onSubmit(){
    if (window.confirm('Are you sure to add event?')) {
    if(this.formData.valid){
      this.loading = true;
      this.subscription = this.batchAPI.createBatchprocess(this.formData.value).subscribe(res=>{
        this._snackBar.open("Batch Process Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.dialog.closeAll();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      },err=>{
        this.error = err;
          this._snackBar.open(this.error , "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
      })
    }else{
      
    }
  }
}

}