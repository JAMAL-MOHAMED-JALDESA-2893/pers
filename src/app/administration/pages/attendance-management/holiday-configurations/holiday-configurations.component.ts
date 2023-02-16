import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HolidayService } from 'src/app/Service/HolidayService/holiday.service';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { UpdateHolidayComponent } from './update-holiday/update-holiday.component';

export interface HolidayData {
  id:String;
  holiday_name:String;
  day_of_week:String;
  month:String;
  holiday_date:String;
  is_active:String;
  created_at:String;
  updated_at:String;
}

@Component({
  selector: 'app-holiday-configurations',
  templateUrl: './holiday-configurations.component.html',
  styleUrls: ['./holiday-configurations.component.scss']
})
export class HolidayConfigurationsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','holiday_name','day_of_week','month','holiday_date','is_active','created_at','updated_at','action'];
  dataSource!: MatTableDataSource<HolidayData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;

  constructor(    
    private holidayConfApi: HolidayService,
    private _snackBar: MatSnackBar,
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
     this.subscription =  this.holidayConfApi.getHolidays().subscribe(res => {
       this.data = res;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  
    addHolidayDialog() {
      const dialogRef = this.dialog.open(AddHolidayComponent,{
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    updateHolidayDialog(id: any) {
      const dialogRef = this.dialog.open(UpdateHolidayComponent,{
        data: {id},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    onDelete(id: any) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.ngOnDestroy();
        this.subscription = this.holidayConfApi.deleteHoliday(id).subscribe(res => {
          // call to destro an instance
          this._snackBar.open("Successful!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar','login-snackbar'],
          });
          // call to reinitialize the table
          this.ngOnInit();
        }, err => {
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
