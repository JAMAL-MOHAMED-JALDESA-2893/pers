import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';

export interface ApiData {
  id:String;
  firstName:String;
  middleName:String;
  lastName:String;
  departmentName:String;
  leave_type:String;
  start_date:String;
  end_date:String;
  status:String;
  supervisor_approval:String;
  hr_approval:String;
  director_approval:String;
  created_at:String;
  updated_at :String;
}


@Component({
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrls: ['./my-leave-requests.component.scss']
})
export class MyLeaveRequestsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','firstName','middleName','lastName','departmentName','leave_type','start_date',
  'end_date','status','supervisor_approval','hr_approval','director_approval','created_at','updated_at','action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  role: any;
  leavesData: any;
  dataRes: any;
  params: any;
  employeeLeavesData: any;
  employeeLeavesDataCount: any;
  leave_status = "Generated"


  constructor(    
    private leavesAPI: LeaveService,
    private employeeAPI: EmployeeService,
    private _snackBar: MatSnackBar,
    ) { }
    ngOnInit() {
      // this.getDepartmentData();
      // this.getData();
    this.getData(this.leave_status);
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    employeeLeaveStatusArray: any = [
      'Rejected','Completed','Processing','Generated'
    ]


      // Get EMployees on Leav
      currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      employee_id = this.currentUser.id;
      

  getData(leave_status:any){    
  this.leave_status = leave_status
  this.params = new HttpParams()
  .set('employee_id',this.employee_id)
  .set('leave_status',leave_status);
    this.subscription= this.leavesAPI.getAllEmployeeLeaveDetalByStatusAndEmployeeId(this.params).subscribe(res=>{
      this.employeeLeavesData = res;
      this.employeeLeavesDataCount  = Object.keys(res).length;
        this.dataSource = new MatTableDataSource(this.employeeLeavesData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
    });

  }

}
