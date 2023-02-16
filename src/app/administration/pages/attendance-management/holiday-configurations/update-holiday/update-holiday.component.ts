import { DatePipe } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceconfigService } from 'src/app/Service/AttendanceconfigService/attendanceconfig.service';
import { HolidayService } from 'src/app/Service/HolidayService/holiday.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrls: ['./update-holiday.component.scss']
})
export class UpdateHolidayComponent implements OnInit {
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
  selecteddate: any;
  fomartedDate: any;
  requestParam: any;
  holidayData: any;

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
      public datepipe: DatePipe,
      public holidayAPI: HolidayService,
      private replyAPI: ReplyService

      ) {}

  ngOnInit(): void {
    this.formInit();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formData = this.fb.group({
    holiday_name: ['', [Validators.required]],
    holiday_date: ['', [Validators.required]],
    is_active: [''],
  });

  formInit(){
    const id = this.data.id;
    this.subscription = this.holidayAPI.getHolidayId(id).subscribe(res=>{
      this.holidayData = res;
      this.formData = this.fb.group({
        holiday_name: [this.holidayData.holiday_name],
        holiday_date: ['',[Validators.required]],
        is_active: [this.holidayData.is_active],
      });
    })

  }

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  onSubmit(){
    if(this.formData.valid){
      const id = this.data.id;
      this.selecteddate =  this.f.holiday_date.value;
      // this.fomartedDate = this.selecteddate.split("/").reverse().join("-");
      this.fomartedDate  =this.datepipe.transform(this.selecteddate, 'yyyy-MM-ddTHH:mm:ss');
      this.requestParam = this.fb.group({
              holiday_name: this.f.holiday_name.value,
              detailed_long_date:this.fomartedDate,
              is_active: this.f.is_active.value
      });
      this.loading = true;
      this.subscription = this.holidayAPI.updateHoliday(id, this.requestParam.value).subscribe(res=>{
        this._snackBar.open("Holiday Successfully updated!", "X", {
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