import {  HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { first } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveapprovalService } from 'src/app/Service/LeaveApproval/leaveapproval.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
@Component({
  selector: 'app-leave-request-update',
  templateUrl: './leave-request-update.component.html',
  styleUrls: ['./leave-request-update.component.scss']
})
export class LeaveRequestUpdateComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  param: any;
  id: any;
  error = '';
  loading = false;
  approveData: any;
  requestData: any;
  employeeLeaveId: any;
  employeeFirstName: any;
  employeeMiddleName: any;
  employeeLastName: any;
  employee: any;
  headExecutive: any;
  personalEmail: any;
  personalPhone: any;
  reportingTo: any;
  specialNeedDescription: any;
  specialNeeds: any;
  workMail: any;
  createdAt: any;
  directorApproval: any;
  endDate: any;
  leaveType: any;
  reason: any;
  startDate: any;
  status: any;
  supervisorApproval: any;
  updatedAt: any;
  completedData: any;
  dataRes: any;
  work_days: any;
  leave_reason: any;
  created_at: any;
  occupation: any;
  position: any;
  department: any;
  rejection_reason: any;
  rejectData: any;
  is_onLeave = false;
  isOnleave: any;
  is_approved = false;
  approvedBySupervisor = false;
  leaveId: any;
  leaveRes: any;
  dialogConfig: any;
 


  constructor(
    public dialog: MatDialog,
    private employeeAPI: EmployeeService,
    private departmentAPI:DepartmentService,
    private leaveAPI: LeaveService,
    private ApprovalApi: LeaveapprovalService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute
    ) { }

  currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  roleClassification = this.currentUser.roleClassification;
  role = this.currentUser.roles[0];

  // getLeaveRequestData(){
  //   // const id = this.actRoute.snapshot.paramMap.get('id');

  //   this.leaveAPI.getEmployeeLeaveId(id).subscribe(data => {
  //     this.employeeLeaveId = data.employeeId
      
  //     // Employee detail
  //   this.employeeAPI.getEmployeeId(this.employeeLeaveId).subscribe(basicData => {      
  //     this.employeeFirstName = basicData.firstName;
  //     this.employeeMiddleName = basicData.middleName;
  //     this.employeeLastName = basicData.lastName;
  //     this.headExecutive = basicData.headExecutive;
  //     this.personalEmail = basicData.personalEmail;
  //     this.personalPhone = basicData.personalPhone;
  //     this.reportingTo = basicData.reportingTo;
  //     this.specialNeedDescription= basicData.specialNeedDescription;
  //     this.specialNeeds = basicData.specialNeeds;
  //     this.workMail= basicData.workMail;
  //     this.occupation = basicData.occupation;
  //     this.position = basicData.position;
  //     // Department Details
  //     this.departmentAPI.getDepartmentId(basicData.departmentId).subscribe(res=>{
  //       this.department = res.departmentName;
  //     })

  //   });
  //   // Department
  //   // Leave request details
  //     this.createdAt = data.createdAt;
  //     this.directorApproval = data.directorApproval;
  //     this.endDate = data.endDate;
  //     this.leaveType = data.leaveType;
  //     this.reason = data.employeeReasonForLeave;
  //     this.startDate = data.startDate;
  //     this.status = data.status;
  //     this.supervisorApproval = data.supervisorApproval;
  //     this.leave_reason = data.employee_reason_for_leave;
  //     this.work_days = data.employee_work_days;
  //     this.created_at = data.created_at;
  //     this.rejection_reason  = data.rejection_reason;
  //     this.isOnleave = data.on_leave;
  //     this.is_approved = true;

  //     if(this.roleClassification == "Administration_privilege"){
  //       this.supervisorApproval = true;
  //     }else{
  //       if(data.supervisor_approval=="Approved"){
  //         this.supervisorApproval = true;
  //       }
  //     }

    
  //   })
  // }

  ngOnInit() {
  
    this.activateRoute.params.subscribe((param) => {
      this.leaveId = param.id;
      console.log("id", param.id);
      
    })

    this.getLeavesById(this.leaveId);
  
      
    
    // this.getLeaveRequestData();
    this.rejectForm();
    this.requestApprove();
    this.completedForm();
  }

  getLeavesById(id: any){
      this.leaveAPI.getEmployeeLeaveId(this.leaveId).subscribe(
        (res) => {
        
          this.leaveRes = res;
          console.log("leaveRecordsById:", this.leaveRes);          
        },
        (err) => {
        this.loading = false;
        this.error = err;
        this._snackBar.open('Error, faild to submit Leave review status!!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'red-snackbar'],
          duration: 2500,
        });
      }
    )
  }
  
  approveLeave() {
    this.ApprovalApi.suApproval(this.leaveId).subscribe(
      (res) => {
        console.log("ApprovalRes:", res);
        
        this.loading = false;
        this._snackBar.open('Leave review status submited successfully.', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'green-snackbar'],
          duration: 2500,
        });
        // this.matDialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.error = err;
        this._snackBar.open('Error, faild to submit leave review status!!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'red-snackbar'],
          duration: 2500,
        });
      }
    ) 
}


  // rejectLeave() {
   
  // }
    rejectLeave(id: any) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "35%";
    this.dialogConfig.data = id;
    let dialogRef = this.dialog.open(LeaveApprovalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res) => {
        this.getSubTopicsBYID(this.subcomplianceid);
      }
    )

  }
  getSubTopicsBYID(subcomplianceid: any) {
    throw new Error('Method not implemented.');
  }
  subcomplianceid(subcomplianceid: any) {
    throw new Error('Method not implemented.');
  }

//    rejectLeave() {
//   let dialogRef = this.mainDialog.open(LeaveApprovalComponent, {
//     width: '40%',
//     // data: any,
//   });
//   dialogRef.afterClosed().subscribe(res => {
//     // this.getData();
//   })
// }

  

  public rejectForm(){
    if(this.role == "ROLE_DIRECTOR"){
      this.rejectData = this.fb.group({
        director_approval: ['Rejected', [Validators.required]],
        supervisor_approval: ['Rejected', [Validators.required]],
        hr_approval: ['Rejected', [Validators.required]],
        rejection_reason: ['', [Validators.required]],
        is_application_open: ['false', [Validators.required]],
        on_leave: ['false', [Validators.required]],
        status:  ['Rejected', [Validators.required]],
      });
    }
    // Second Level AUthorization - Admin/HR
    if(this.role == "ROLE_HR"){
      this.rejectData = this.fb.group({
        hr_approval: ['Rejected', [Validators.required]],
        supervisor_aproval: ['Rejected', [Validators.required]],
        rejection_reason: ['', [Validators.required]],
        is_application_open: ['false', [Validators.required]],
        on_leave: ['false', [Validators.required]],
        status:  ['Rejected', [Validators.required]],
      });
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    if(this.role == "ROLE_SUPERVISOR"){
      this.rejectData = this.fb.group({
        supervisor_approval: ['Rejected', [Validators.required]],
        rejection_reason: ['', [Validators.required]],
        is_application_open: ['false', [Validators.required]],
        on_leave: ['false', [Validators.required]],
        status:  ['Rejected', [Validators.required]],
      });
    }
  }


  public requestApprove(){
    if(this.role == "ROLE_DIRECTOR"){
      this.approveData = this.fb.group({
        director_approval: ['Approved', [Validators.required]],
        hr_approval: ['Approved', [Validators.required]],
        supervisor_approval: ['Approved', [Validators.required]],
        is_application_open: ['true', [Validators.required]],
        on_leave: ['true', [Validators.required]],
        status:  ['Approved', [Validators.required]],
      });
    }
    // Second Level Authorization - Admin/HR
    if(this.role == "ROLE_HR"){
      this.approveData  = this.fb.group({
        hr_approval: ['Approved', [Validators.required]],
        supervisor_approval: ['Approved', [Validators.required]],
        is_application_open: ['true', [Validators.required]],
        on_leave: ['true', [Validators.required]],
        status:  ['Approved', [Validators.required]],
      });
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    if(this.role == "ROLE_SUPERVISOR"){
      this.approveData  = this.fb.group({
        supervisor_approval: ['Approved', [Validators.required]],
        is_application_open: ['true', [Validators.required]],
        on_leave: ['false', [Validators.required]],
        status:  ['Processing', [Validators.required]],
      });
    }
  }


  public completedForm(){
    this.completedData = this.fb.group({
      supervisor_approval: ['Approved', [Validators.required]],
      director_approval: ['Approved', [Validators.required]],
      hr_approval: ['Approved', [Validators.required]],
      is_application_open: ['false', [Validators.required]],
      on_leave: ['false', [Validators.required]],
      status:  ['Completed', [Validators.required]],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.rejectData.controls[controlName].hasError(errorName);
  };
  get f() { return this.requestData.controls; }

  // onApprove(){
  //   if(this.approveData.valid){
  //     const id = this.actRoute.snapshot.paramMap.get('id');
  //     const paramData = this.approveData.value
  //     console.log("data", paramData);
  //        this.leaveAPI.hrApproveEmployeeLeave(id,paramData ).pipe(first())
  //       .subscribe(
  //       result => {
  //         this._snackBar.open("Successful!", "X", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: 3000,
  //           panelClass: ['green-snackbar','login-snackbar'],
  //         });
  //               this.ngZone.run(() => this.router.navigateByUrl('administration/leaves'));
  //           },
  //           error => {
  //               this.error = error.message;
  //               this._snackBar.open(this.error, "Try again!", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['red-snackbar','login-snackbar'],
  //               });
  //           });

  //         }else{
  //     this._snackBar.open("Invalid Form data", "Try again!", {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: 3000,
  //       panelClass: ['red-snackbar','login-snackbar'],
  //     });
  //         }
  // }

  // onReject(){
  //   if(this.rejectData.valid){
  //     const id = this.actRoute.snapshot.paramMap.get('id');
  //     const paramData = this.rejectData.value
  //     console.log("params", paramData);
  //        this.leaveAPI.updateEmployeeLeave(id,paramData ).pipe(first())
  //       .subscribe(
  //       result => {
  //               this._snackBar.open("Successful!", "X", {
  //               horizontalPosition: this.horizontalPosition,
  //               verticalPosition: this.verticalPosition,
  //               duration: 3000,
  //               panelClass: ['green-snackbar','login-snackbar'],
  //             });
  //               this.ngZone.run(() => this.router.navigateByUrl('administration/leaves'));
  //           },
  //           error => {
  //               this.error = error.message;
  //               this.error = error.message;
  //               this._snackBar.open(this.error, "Try again!", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['red-snackbar','login-snackbar'],
  //               });
  //           });

  //         }else{
  //     this._snackBar.open("Invalid Form data", "Try again!", {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: 3000,
  //       panelClass: ['red-snackbar','login-snackbar'],
  //     });
  //         }
  // }


  // onCompleted(){
  //   if(this.completedData.valid){
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //   const paramData = this.completedData.value
  //        this.leaveAPI.closeEmployeeLeave(id,paramData ).pipe(first())
  //     .subscribe(
  //     result => {
  //             this._snackBar.open("Successful!", "X", {
  //               horizontalPosition: this.horizontalPosition,
  //               verticalPosition: this.verticalPosition,
  //               duration: 3000,
  //               panelClass: ['green-snackbar','login-snackbar'],
  //             });
  //             this.ngZone.run(() => this.router.navigateByUrl('administration/leaves'));
  //         },
  //         error => {
  //           console.log(error);
            
  //             this.error = error.message;
  //             this.error = error.message;
  //               this._snackBar.open(this.error, "Try again!", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['red-snackbar','login-snackbar'],
  //               });
  //         });

  //       }else{
  //   this._snackBar.open("Invalid Form data", "Try again!", {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     duration: 3000,
  //     panelClass: ['red-snackbar','login-snackbar'],
  //   });
  //       }

  // }

}

