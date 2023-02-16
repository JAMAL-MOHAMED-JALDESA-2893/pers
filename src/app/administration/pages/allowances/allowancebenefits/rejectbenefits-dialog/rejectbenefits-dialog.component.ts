import { HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomBenefitsService } from 'src/app/Service/CustomBenefits/custom-benefits.service';

@Component({
  selector: 'app-rejectbenefits-dialog',
  templateUrl: './rejectbenefits-dialog.component.html',
  styleUrls: ['./rejectbenefits-dialog.component.scss']
})
export class RejectbenefitsDialogComponent implements OnInit {
  id: any;
  params: any;
  loading: boolean = false;
  rejection_reason_director: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allowanceBenefitsAPI: CustomBenefitsService,
    private matDialogRef: MatDialogRef<RejectbenefitsDialogComponent>
  ) {
    console.log("Data", data);
    
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
  submitData() {
    if (this.formData.valid) {
      if (window.confirm('Are you sure you want to REJECT this Benefits?')) {
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
              this._snackBar.open("Custom Allowance Benefits Rejected successfully.", "OK", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar']
              });
              this.matDialogRef.close();
              this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
            },
            error => {
              this.loading = false;
              this._snackBar.open("Error, Failed to reject Custom allowance benefits!!", "TRY AGAIN", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar']
              });
            });
      }
    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Custom allowance benefits form invalid", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar']
      });
    }

  }
}
