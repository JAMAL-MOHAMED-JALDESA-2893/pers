import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/Service/Performance/CommentService/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
id: any;
newid: any;
loading = false;
subscription: Subscription = new Subscription;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public fb: FormBuilder,
  private dialog: MatDialog,
  private router: Router,
  private commentAPI: CommentService

  ) {}

ngOnInit(): void {
  this.getData();
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
  
}
formData = this.fb.group({
  employee_id: [''],
  pm_review_id: [''],
  comment: ['', [Validators.required]],
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
    pm_review_id: [this.data.id],
    comment: ['', [Validators.required]],
  });
}
onSubmit(){
  if(this.formData.valid){
    this.loading = true;
    this.subscription = this.commentAPI.createComment(this.formData.value).subscribe(res=>{
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