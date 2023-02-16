import { HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomBenefitsService } from 'src/app/Service/CustomBenefits/custom-benefits.service';

@Component({
  selector: 'app-reviewallowancebenefits',
  templateUrl: './reviewallowancebenefits.component.html',
  styleUrls: ['./reviewallowancebenefits.component.scss']
})
export class ReviewallowancebenefitsComponent implements OnInit {
  id: any;
  params: any;
  approval: any;
  loading: boolean = false;
  showRejectField: boolean = false;
  rejection_reason_director: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  approvalStatus = [
    {
      id: 1,
      value: 'approve',
      name: 'Approve Benefits Allowance',
    },
    {
      id: 2,
      value: 'reject',
      name: 'Reject Benefits Allowance',
    }
  ];
  error: any;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allowanceBenefitsAPI: CustomBenefitsService,
    private matDialogRef: MatDialogRef<ReviewallowancebenefitsComponent>
  ) {
    console.log("Dialog data for approval", data);

  }
  formData = this.fb.group({
    id: ['', Validators.required],
    rejection_reason_director: ['', Validators.required],
  });
  onInitformData() {
    this.formData = this.fb.group({
      id: [this.data.id],
      rejection_reason_director: [this.data.rejection_reason_director]
    })
  }
  ngOnInit(): void {
    this.onInitformData();
  }
  onSelectSatus(event: any) {
    this.approval = event.value;
    console.log("Event Value", this.approval);
    if (this.approval == 'approve') {
      this.showRejectField = false;
      if (window.confirm('Are you sure you want to APPROVE this Benefits?')) {

        this.allowanceBenefitsAPI.directorApprove(this.data.id)
          .subscribe(
            result => {
              this.loading = false;
              this._snackBar.open("Custom Allowance Benefits APPROVED successfully.", "OK", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
            },
            error => {
              this.loading = false;
              this._snackBar.open("ERROR! Failed to APPROVE custom allowance benefits!!", " TRY AGAIN!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            });
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));

      }

    }
    if (this.approval == 'reject') {
      this.showRejectField = true;
      this.submitData();
    }
  }

  submitData() {
    if (this.formData.valid) {
      this.loading = true;
      this.id = this.formData.controls.id.setValue(this.data.id);
      this.rejection_reason_director = this.formData.controls.rejection_reason_director.value;
      this.params = new HttpParams()
        .set('id', this.data.id)
        .set('rejection_reason_director', this.rejection_reason_director);
      console.log("params", this.params);
      this.allowanceBenefitsAPI.directorReject(this.params)
        .subscribe(
          result => {
            this.loading = false;
            this._snackBar.open("Custom Allowance Benefits added successfully.", "OK", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
          },
          error => {

          });

    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Custom allowance benefits form invalid", "TRY AGAIN", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],

      });
    }
  }
  }
