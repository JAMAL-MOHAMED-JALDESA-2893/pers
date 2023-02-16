import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';


@Component({
  selector: 'app-updategoal',
  templateUrl: './updategoal.component.html',
  styleUrls: ['./updategoal.component.scss']
})
export class UpdategoalComponent implements OnInit {
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
      private replyAPI: ReplyService

      ) {}

  ngOnInit(): void {
  this.goal_id = this.data.id
    // this.getData();
    this. getParameters();
    this.initialiseForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
    
  }
  formData = this.fb.group({
    employee_id: [''],
    parameter_id: [''],
    pm_comment_id: [''],
    goal: ['', [Validators.required]],
    next_month_review_delay: ['', [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(5)]]
  });

  // private Long pm_comment_id;
  // private Long pm_reply_id;
  // private String reply = "";
  // private String status = "Pending";
  getParameters(){
    this.subscription = this.parameterAPI.getParameters().subscribe(res=>{
      this.data = res;
      console.log("responded paramaters", res)
    }, err=>{

    })
  }
  initialiseForm(){
    console.log("hey dialog", this.data);
    
    let id = this.data.id
    this.subscription = this.goalAPI.getGoalId(id).subscribe(res=>{
      this.results = res;
      this.formData = this.fb.group({
        employee_id: [this.results.employee_id],
         pm_comment_id: [this.results.pm_comment, ],
         parameter_id: [this.results.parameter_id, Validators.required],
         goal: [this.results.goal, Validators.required],
         next_month_review_delay: [this.results.next_month_review_delay, [Validators.required,Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1),Validators.maxLength(5)]],
       });
    }, err=>{

    })
  }

  // getData(){
  //   let employee_id = this.actRoute.snapshot.paramMap.get('id');
  //   this.formData = this.fb.group({
  //    employee_id: this.data.id,
  //     pm_comment_id: [this.data.id],
  //     parameter_id: [''],
  //     goal: ['', [Validators.required]],
  //     next_month_review_delay: ['', ],
  //   });
  // }
  onSubmit(){
    if(this.formData.valid){
      if (window.confirm('Are you sure you want to reset scheduled date? Be informed that if you reschedule now, your next schedule date will be calculated from today.')) {
      let id = this.goal_id
      this.loading = true;
      this.subscription = this.goalAPI.updateGoal(id, this.formData.value).subscribe(res=>{
        this.dialog.closeAll();
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

}