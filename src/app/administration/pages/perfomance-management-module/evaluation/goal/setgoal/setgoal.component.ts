import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-setgoal',
  templateUrl: './setgoal.component.html',
  styleUrls: ['./setgoal.component.scss']
})
export class SetgoalComponent implements OnInit {
  id: any;
  newid: any;
  loading = false;
  subscription: Subscription = new Subscription;

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
    this.getData();
    this. getParameters();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();


  }
  formData = this.fb.group({
    employee_id: [],
    parameter_id: [''],
    pm_comment_id: [''],
    goal: ['', [Validators.required]],
    next_month_review_delay: ['']
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

  getData(){
    this.formData = this.fb.group({
     employee_id: this.data.id,
      pm_comment_id: [this.data.id],
      parameter_id: [''],
      goal: [''],
      next_month_review_delay: [''],
    });
  }
  onSubmit(){
    console.log("Hey form data", this.formData.value)
    if(this.formData.valid){
      this.loading = true;
      this.subscription = this.goalAPI.createGoal(this.formData.value).subscribe(res=>{
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