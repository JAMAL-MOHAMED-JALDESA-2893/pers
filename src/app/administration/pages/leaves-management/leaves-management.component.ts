import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  selector: 'app-leaves-management',
  templateUrl: './leaves-management.component.html',
  styleUrls: ['./leaves-management.component.scss']
})
export class LeavesManagementComponent implements OnInit  {
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
    private router:Router,
    private leavesAPI: LeaveService,
    private employeeAPI: EmployeeService,
    private _snackBar: MatSnackBar,
  ) { }
  
  ngOnInit() {
    this.getLeaves();
      // this.getDepartmentData();
      // this.getData();
    // this.getData(this.leave_status);
  }

  updateLeave(id:any) {
    this.router.navigate([`/administration/leaves/request/update/${id}`])
  }

  getLeaves() {
    this.leavesAPI.getEmployeesLeaves().subscribe(
      (res) => {
        this.data = res;
        console.log("Emp Leaves", this.data);

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
        
      }
    )
  }
    // ngOnDestroy(): void {
    //   this.subscription.unsubscribe();
    // }
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
    // getDepartmentData() {
    // let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    // this.role = currentUser.roles[0];
    // // get authorized data
    //  this.subscription =  this.leavesAPI.getInactiveEmployeeLeaveByDepartmentId(currentUser.id).subscribe(res => {
    //    this.data = res;
    //     // Binding with the datasource
    //     this.dataSource = new MatTableDataSource(this.data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // }

      // Get EMployees on Leav

  // getData(leave_status:any){    
  // this.leave_status = leave_status
  // this.params = new HttpParams()
  // .set('leave_status',leave_status);
  //   this.subscription= this.leavesAPI.getAllEmployeeLeaveDetalByStatus(this.params).subscribe(res=>{
  //     this.employeeLeavesData = res;
  //   console.log("Leavrs:", this.employeeLeavesData);
      
  //     this.employeeLeavesDataCount  = Object.keys(res).length;
  //       this.dataSource = new MatTableDataSource(this.employeeLeavesData);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
      
  //   });

  // }

    
    // getData() {
    //   let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    //   this.role = currentUser.roles[0];
    //   // get authorized data
    //   this.employeeAPI.getEmployeeId(currentUser.id).subscribe(res=>{
    //     this.dataRes = res;
    //   // First Level Authorization - Admin
    //   if(this.role == "ROLE_DIRECTOR"){
    //     this.leavesAPI.getAllEmployeeLeaveDetal().subscribe(data => {
    //       this.leavesData = data;

    //       this.dataSource = new MatTableDataSource(this.leavesData);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     })
    //   }
    //   // Second Level AUthorization - Admin/HR
    //   if(this.role == "ROLE_HR"){
    //     this.leavesAPI.getAllEmployeeLeaveDetal().subscribe(data => {
    //       this.leavesData = data;
          
    //       this.dataSource = new MatTableDataSource(this.leavesData);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     })
    //   }
    //   // Third Level AUthorization - Admin/HR/Supervisor
    //   if(this.role == "ROLE_SUPERVISOR"){
    //     this.leavesAPI.getInactiveEmployeeLeaveByDepartmentId(this.dataRes.departmentId).subscribe(data => {
    //       this.leavesData = data;
    //       console.log(data);
          
          
    //       this.dataSource = new MatTableDataSource(this.leavesData);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     })
    //   }
  
    //   })
  
    // }

}
