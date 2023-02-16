import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceconfigService } from 'src/app/Service/AttendanceconfigService/attendanceconfig.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-add-attendance-configurations',
  templateUrl: './add-attendance-configurations.component.html',
  styleUrls: ['./add-attendance-configurations.component.scss']
})
export class AddAttendanceConfigurationsComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: any;
  newid: any;
  loading = false;
  subscription: Subscription = new Subscription;
  weekDayaArray: any = [
    'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'
  ]
  error: any;

  // constructor(
  //   private actRoute: ActivatedRoute,) { }
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fb: FormBuilder,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private router: Router,
      private ngZone: NgZone,
      private actRoute: ActivatedRoute,
      private parameterAPI: ParametersService,
      private goalAPI: GoalService,
      private attendanceConfigAPI: AttendanceconfigService,
      private replyAPI: ReplyService

      ) {}

  ngOnInit(): void {
    this.formInit();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    day: ['', [Validators.required]],
    open_hours: ['', [Validators.required]],
    closing_hours: ['', [Validators.required]],
    is_open: ['']
  });
  formInit(){
    this.formData = this.fb.group({
      day: ['', [Validators.required]],
      open_hours: ['', [Validators.required]],
      closing_hours: ['', [Validators.required]],
      is_open: ['false']
    });
  }
  onSubmit(){
    if(this.formData.valid){
      this.loading = true;
      this.subscription = this.attendanceConfigAPI.createAttendanceConfig(this.formData.value).subscribe(res=>{
        this._snackBar.open("Day Successfully added!", "X", {
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
          this._snackBar.open(this.error, "Try again!", {
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