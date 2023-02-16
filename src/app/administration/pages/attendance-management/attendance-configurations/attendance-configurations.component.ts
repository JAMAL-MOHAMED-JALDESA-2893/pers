import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceconfigService } from 'src/app/Service/AttendanceconfigService/attendanceconfig.service';
import { AddAttendanceConfigurationsComponent } from './add-attendance-configurations/add-attendance-configurations.component';
import { UpdateAttendanceConfigurationsComponent } from './update-attendance-configurations/update-attendance-configurations.component';

export interface ApiData {
  id:String;
  day:String;
  open_hours:String;
  closing_hours:String;
  is_open:String;
  created_at:String;
  updated_at:String;
}



@Component({
  selector: 'app-attendance-configurations',
  templateUrl: './attendance-configurations.component.html',
  styleUrls: ['./attendance-configurations.component.scss']
})
export class AttendanceConfigurationsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','day','open_hours','closing_hours','is_open','created_at','updated_at','action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;

  constructor(    
    private attendanceConfigAPI: AttendanceconfigService,
    private _snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
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
    getData() {      
      this.subscription = this.attendanceConfigAPI.getAttendanceConfigs().subscribe(res=>{

       this.data = res;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    
    addAttendanceDialog() {
      const dialogRef = this.dialog.open(AddAttendanceConfigurationsComponent,{
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    updateAttendanceDialog(id: any) {
      const dialogRef = this.dialog.open(UpdateAttendanceConfigurationsComponent,{
        data: {id},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    // onDelete(id: any) {
    //   if (window.confirm('Are you sure you want to delete?')) {
    //     this.ngOnDestroy();
    //     this.subscription = this.holidayConfApi.deleteHoliday(id).subscribe(res => {
    //       // call to destro an instance
    //       this._snackBar.open("Successful!", "X", {
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //         duration: 3000,
    //         panelClass: ['green-snackbar','login-snackbar'],
    //       });
    //       // call to reinitialize the table
    //       this.ngOnInit();
    //     }, err => {
    //       this.error = err;
    //       this._snackBar.open(this.error, "Try again!", {
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //         duration: 3000,
    //         panelClass: ['red-snackbar','login-snackbar'],
    //       });
    //     })
    //   }
    // }

}
