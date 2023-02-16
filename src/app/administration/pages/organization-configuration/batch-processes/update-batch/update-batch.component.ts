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
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.scss']
})
export class UpdateBatchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: any;
  newid: any;
  loading = false;
  subscription: Subscription = new Subscription;
  error: any;
  results: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private batchAPI: BatchService,

  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    execution_date: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(2)]]
  });
  initialiseForm() {
    let id = this.data.id
    this.subscription = this.batchAPI.getBatchprocessId(id).subscribe(res => {
      this.results = res;
      this.formData = this.fb.group({
        execution_date: [this.results.execution_date]
      });
    }, err => {
    })
  }
  onSubmit() {
    if (window.confirm('Are you sure to add event?')) {
      if (this.formData.valid) {
        let id = this.data.id
        this.subscription = this.batchAPI.updateBatchprocess(id, this.formData.value).subscribe(res => {
          this._snackBar.open("Batch Process Successfully Created!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          this.dialog.closeAll();
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })
      } else {

      }
    }
  }

}
