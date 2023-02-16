import { HttpClient } from '@angular/common/http';
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

export interface ApiData {
  
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
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.scss']
})
export class AttendanceManagementComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','firstname','middlename','lastname','departmentname','day','register_on','day_identity','attendance_status',
  'time_in','time_in_status','time_out','action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  is_Hr = false;
  role: any;
  is_Director = false;

  constructor(    
    private attendanceAPI: AttendanceService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }
    ngOnInit() {

      this.Authorize();
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
    getData() {      
      this.subscription = this.attendanceAPI.getTodaysAttendances().subscribe(res=>{

       this.data = res;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }

    Authorize(){
      let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      this.role = currentUser.roles[0];
    
      // First Level Authorization - Admin
      if(this.role == "ROLE_DIRECTOR"){
        this.is_Director = true;
      }
      // Second Level AUthorization - Admin/HR
      if(this.role == "ROLE_HR"){
        this.is_Hr = true;
      }
      // Third Level AUthorization - Admin/HR/Supervisor
     
      }
      createRegister(){
        this.subscription = this.attendanceAPI.getRegister().subscribe(res=>{
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
          this._snackBar.open("!" + this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })
        

      }
  
    checkIn(id:any){
        if (window.confirm('Are you sure you want to check in')) {
        this.subscription = this.attendanceAPI.checkIn(id).subscribe(res=>{
          this._snackBar.open("Checked In Successfully!", "X", {
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
          this._snackBar.open("!" + this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        }) 
      }
    }
    checkOut(id:any){
      if (window.confirm('Are you sure you want to check out')) {
        this.subscription = this.attendanceAPI.checkOut(id).subscribe(res=>{
          this._snackBar.open("Checked Out Successfully!", "X", {
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
          this._snackBar.open("!" + this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        }) 
    }
  }

}
