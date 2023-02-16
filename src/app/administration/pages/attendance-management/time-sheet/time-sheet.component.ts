import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'src/app/Service/AttendanceService/attendance.service';
import { AttendanceconfigService } from 'src/app/Service/AttendanceconfigService/attendanceconfig.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

export interface ApiData {
  id:String;
  firstname:String;
  middlename:String;
  lastname:String;
  departmentname:String;
  day:String;
  register_on:String;
  day_identity:String;
  attendance_status:String;
  time_in:String;
  time_in_status:String;
  time_out:String;
  time_out_status:String;
}

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','firstname','middlename','lastname','departmentname','day','register_on','day_identity','attendance_status',
  'time_in','time_in_status','time_out','time_out_status'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  role: any;
  dataRes: any;

  constructor(    
    private attendanceAPI: AttendanceService,
    private employeeAPI: EmployeeService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }
    ngOnInit() {
      this.getData();
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
    // getData() {      
    //   this.subscription = this.attendanceAPI.getAttendancesDetailed().subscribe(res=>{
    //    this.data = res;
    //     // Binding with the datasource
    //     this.dataSource = new MatTableDataSource(this.data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // }

        getData() {
      let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      this.role = currentUser.roles[0];
      // get authorized data
      this.employeeAPI.getEmployeeId(currentUser.id).subscribe(res=>{
        this.dataRes = res;
        
      // First Level Authorization - Admin
      // if(this.role == "ROLE_DIRECTOR"){
      //   this.leavesAPI.getAllEmployeeLeaveDetal().subscribe(data => {
      //     this.leavesData = data;

      //     this.dataSource = new MatTableDataSource(this.leavesData);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   })
      // }
      // Second Level AUthorization - Admin/HR
      // if(this.role == "ROLE_HR"){
      //   this.leavesAPI.getAllEmployeeLeaveDetal().subscribe(data => {
      //     this.leavesData = data;
          
      //     this.dataSource = new MatTableDataSource(this.leavesData);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   })
      // }
      // Third Level AUthorization - Admin/HR/Supervisor
      if(this.role == "ROLE_SUPERVISOR"){
        const params = new HttpParams()
        .set('department_id', this.dataRes.departmentId);
        this.subscription = this.attendanceAPI.getAttendancesDetailedPerDepartment(params).subscribe(res=>{
          this.data = res;
           // Binding with the datasource
           this.dataSource = new MatTableDataSource(this.data);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
         })
      }else{
        this.subscription = this.attendanceAPI.getAttendancesDetailed().subscribe(res=>{
             this.data = res;
              // Binding with the datasource
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
      }
  
      })
  
    }

    // getAttendancesDetailedPerDepartment(params:any)

    
  }
