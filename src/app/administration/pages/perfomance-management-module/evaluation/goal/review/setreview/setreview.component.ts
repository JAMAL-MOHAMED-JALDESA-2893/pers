import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ReviewService } from 'src/app/Service/Performance/ReviewService/review.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

@Component({
  selector: 'app-setreview',
  templateUrl: './setreview.component.html',
  styleUrls: ['./setreview.component.scss']
})
export class SetreviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  ifReply= false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  subscription: Subscription = new Subscription;
  employee_id: any;
  onBoardForm: any;
  goal_id: any;
  reviewData: any;
  percentage_score: any;
  remarks: any;
  reccomndations: any;
  comments: any;
  keyCount:any;
  firstname: any;
  result: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmentAPI: DepartmentService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private goalAPI: GoalService,
    private reviewAPI: ReviewService,
    private tokenStorage: TokenStorageService,
    private employeeAPI: EmployeeService,
    private dialog: MatDialog) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    remarks: ['', [Validators.required]],
    recommendations: ['', [Validators.required]],
    percentage_score: ['', [Validators.required]]
  });
    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.formData.controls[controlName].hasError(errorName);
    };
    get f() { return this.formData.controls; }

    submitData() {
      if(this.formData.valid){
        const goal_id = this.data.id
        this.subscription =  this.goalAPI.getGoalDetailId(goal_id).subscribe( res=>{
          this.result = res;
          this.onBoardForm = this.fb.group({
            employee_id: this.result.employee_id,
            pm_goal_id: goal_id,
            remarks:  this.f.remarks.value,
            recommendations: this.f.recommendations.value,
            percentage_score: this.f.percentage_score.value,
          })
        this.reviewAPI.createReview(this.onBoardForm.value).subscribe( res=>{
          this._snackBar.open("Reviewed Successfully!", "X", {
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
        }, err=>{
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })
        }, err=>{
      
        });
      
      }
      }


}
