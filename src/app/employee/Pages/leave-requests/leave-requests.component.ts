import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

const middleName = "";



@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss']
})
export class LeaveRequestsComponent implements OnInit, OnDestroy {
  displayedColumns = ['leave_type', 'start_date', 'end_date', 'status', 'supervisor_approval', 'hr_approval',
   'created_at', 'updated_at', 'actions']
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  employeeLeaves: any;
  employeeCount: any;
  reportingTo: any;
  error: any;


  constructor(
    private employeeAPI: EmployeeService,
    private leaveAPI: LeaveService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar,

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

    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    const  employee_id  = currentUser.id;
    this.leaveAPI.getLeavesByEmployeeId(employee_id).subscribe(res=>{
      this.employeeLeaves = res;

    }, err=>{
    });
  }


  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.leaveAPI.deleteEmployeeLeave(id).subscribe(res => {
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
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
    }
  }

}
