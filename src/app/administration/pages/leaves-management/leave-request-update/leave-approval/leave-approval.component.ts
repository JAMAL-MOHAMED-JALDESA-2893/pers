
import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LeaveapprovalService } from 'src/app/Service/LeaveApproval/leaveapproval.service';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss']
})
export class LeaveApprovalComponent implements OnInit {
  status = [
    {
      id: 1,
      value: 'approved',
      name: 'Approved',
    },
    {
      id: 2,
      value: 'rejected',
      name: 'Rejected',
    }   
  ];

  statusData: any;
  id: any;
  error: any;
  data: any;
  params: any;
  leaveStatus: any;
  reason: any;
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar, 
    private ApprovalService: LeaveapprovalService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matDialogRef: MatDialogRef<LeaveApprovalComponent>
  ) { }

  leaveApprovalForm = this.fb.group({
    id: ['', Validators.required],
    leaveStatus: ['', Validators.required],
    reason: ['', Validators.required]
  });

  onInitleaveApprovalForm() {
    this.leaveApprovalForm = this.fb.group({
                     id: [this.editData.id],
            leaveStatus: [this.editData.leaveStatus],
      reason: [this.editData.reason]
    })
  }

  ngOnInit(): void {
    this.getStatus();
    this.onInitleaveApprovalForm();
  }

  getStatus() {
    this.statusData = this.status;
  }
  
  submit(id: any) {
  
  }
}