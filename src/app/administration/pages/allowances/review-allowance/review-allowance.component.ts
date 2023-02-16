import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllowanceService } from 'src/app/Service/AllowanceService/allowance.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-review-allowance',
  templateUrl: './review-allowance.component.html',
  styleUrls: ['./review-allowance.component.scss']
})
export class ReviewAllowanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  id: any;
  newid: any;
  loading = false;
  subscription: Subscription = new Subscription;
  results: any;
  goal_id: any;

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
      private allowanceAPI: AllowanceService,
      private replyAPI: ReplyService,
      private _snackBar: MatSnackBar,

      ) {}

  ngOnInit(): void {
  this.goal_id = this.data.id
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    rejection_reason_director: ['', [Validators.required]]
  });

  onSubmit(){
    let id = this.data.id
    if(this.formData.valid){
      this.loading = true;
      this.subscription = this.allowanceAPI.directorReject(id, this.formData.value).subscribe(res=>{
        this.dialog.closeAll();
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
  
      },err=>{
  
      })
    }else{
      
    }
  }

}



