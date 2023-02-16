import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReplyService } from 'src/app/Service/Performance/ReplyService/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
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
      private replyAPI: ReplyService

      ) {}

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
  formData = this.fb.group({
    employee_id: [''],
    pm_comment_id: [''],
    reply: ['', [Validators.required]],
  });

  // private Long pm_comment_id;
  // private Long pm_reply_id;
  // private String reply = "";
  // private String status = "Pending";

  getData(){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    let employee_id = currentUser.id
    this.formData = this.fb.group({
     employee_id: [employee_id],
      pm_comment_id: [this.data.id],
      reply: ['', [Validators.required]],
    });
  }
  onSubmit(){
    console.log("Hey form data", this.formData.value)
    if(this.formData.valid){
      this.loading = true;
      this.subscription = this.replyAPI.createReply(this.formData.value).subscribe(res=>{
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