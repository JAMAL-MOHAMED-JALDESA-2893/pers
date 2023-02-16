import { LeaveTypeService } from 'src/app/Service/LeaveType/leave-type.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const middleName = "";


@Component({
  selector: 'app-leave-type-component',
  templateUrl: './leave-type-component.component.html',
  styleUrls: ['./leave-type-component.component.scss']
})
export class LeaveTypeComponentComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();
  subscription!:Subscription;

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  leavesData: any;
  disabled =  false;
  error: any;


  constructor(
    private employeeAPI: EmployeeService,
    private _snackBar: MatSnackBar,
    private leavesAPI: LeaveService,
    private router: Router,
    private ngZone: NgZone,
    private leaveTypeAPI: LeaveTypeService
    ) { }


  ngOnInit() {
    this.getData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); 
  }

  getData() {
    this.leaveTypeAPI.getLeavesTypes().subscribe(data => {
      this.leavesData = data;
    })
  }


  onEnabled(id: any){
    this.subscription = this.leaveTypeAPI.onEnabledLeaveType(id).subscribe(res=>{
      this._snackBar.open("Enabled Successfully Created!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }, err=>{
      this.error = err
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
  }
  onDisabled(id: any){
    this.subscription = this.leaveTypeAPI.onDisabledLeaveType(id).subscribe(res=>{
      this._snackBar.open("Disabled Successfully Created!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }, err=>{
      this.error = err
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
  }
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.subscription = this.leaveTypeAPI.deleteLeaveType(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }



}
