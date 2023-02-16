import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ReviewService } from 'src/app/Service/Performance/ReviewService/review.service';
import { CommentComponent } from '../comment/comment.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements  OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  ifReply= false;
  onEnabled = false;
  showWarning =  false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  subscription: Subscription = new Subscription;
  data: any;
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


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private goalAPI: GoalService,
    private reviewAPI: ReviewService,
    private employeeAPI: EmployeeService,
    private dialog: MatDialog
    ) { }



  ngOnInit() {
    this.getDetails();
  }
  openReplyDialog(id:any) {
    console.log("hey its", id)
    const dialogRef = this.dialog.open(ReplyComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openCommentDialog(id: any) {
    const dialogRef = this.dialog.open(CommentComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  triggerRepy(){
    this.ifReply = true;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe
    // this.dtTrigger.unsubscribe();
  }
  getDetails(){
  this.goal_id = this.actRoute.snapshot.paramMap.get('id');
  this.subscription = this.goalAPI.getGoalDetailId(this.goal_id).subscribe( res=>{
      this.data = res;
      console.log("review ", this.data.reviewenabled)

    if(this.data.reviewenabled='true'){
      this.onEnabled = true;
      this.showWarning = false;
    }else{
      this.onEnabled = false
      this.showWarning = true;
    }



      const employee_id = this.data.employee_id;
      // initialise a query to call the reviews data
      let params = new HttpParams()
      .set('employee_id', employee_id )
      .set('goal_id', this.goal_id);
      this.subscription = this.reviewAPI.getLastReviewBygoalId(params).subscribe( res=>{

        this.reviewData = res;
        this.percentage_score = res.percentage_score;
        this.remarks = res.remarks;
        this.reccomndations = res.recommendations
        this.comments = res.pm_comments;
        this.keyCount  = Object.keys(this.comments).length;

        for(let result of this.comments){
          this.employee_id =  result .employee_id
          this.subscription = this.employeeAPI.getEmployeeId(this.employee_id).subscribe(res=>{
            this.firstname = res.firstName
          }, err=>{

          })
        }






      }, err=>{

      })

    }, err=>{
    })

  }




  onDelete(id: any) {
    // if (window.confirm('Are you sure to delete?')) {
    //   this.employeeAPI.deleteEmployee(id).subscribe(res => {
    //     // call to destro an instance
    //     this.ngOnDestroy();
    //     // call to reinitialize the table
    //     this.ngOnInit();
    //   })
    // }
  }

}
