import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';

export interface DepartmentData {
  id:String;
  departmentName:String;
  departmentMail: String;
  createdAt:String;
  updatedAt:String;
}

@Component({
  selector: 'app-departments-management',
  templateUrl: './departments-management.component.html',
  styleUrls: ['./departments-management.component.scss']
})
export class DepartmentsManagementComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id','departmentName','departmentMail','createdAt','updatedAt','action'];
  dataSource!: MatTableDataSource<DepartmentData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  error: any;

  constructor(    
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    ) { }
    ngOnInit() {
      this.getDepartmentData();
    }
    ngOnDestroy(): void {
      //this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getDepartmentData() {
     this.departmentAPI.getDepartments().subscribe(res => {
       this.data = res;
       console.log("this.res", res);
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    onDelete(id: any) {
      if (window.confirm('Are you sure to delete?')) {
        this.ngOnDestroy();
        this.departmentAPI.deleteDepartment(id).subscribe(res => {
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
          this.error = err.error;
          this._snackBar.open("Error: You can not delete a department which has got employees!", "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })
      }
    }

}
