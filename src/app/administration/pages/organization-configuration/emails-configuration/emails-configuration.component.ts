import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';
import { EmailConfigurationService } from './email-configuration.service';
const middleName = "";

@Component({
  selector: 'app-emails-configuration',
  templateUrl: './emails-configuration.component.html',
  styleUrls: ['./emails-configuration.component.scss']
})
export class EmailsConfigurationComponent implements OnInit{
  displayedColumns: string[] = [
    'index',
    'email_organization_name',
    'email_type',
    'email_organization_address',
    'email_organization_phone',
    'email_salutation',
    'email_subject',
    'email_heading',
    'email_regards_from',
    'email_organization_location',
    'email_message',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading: boolean = false;;
  departmentData: any;
  e: any;
  error: any;
  data: any;

  constructor(
    private _snackBar: MatSnackBar,
    private emailConfigAPI: EmailConfigurationService,
    private http: HttpClient
    ) {}
  ngOnInit() {
    this.getKRAData();
  }
  ngOnDestroy(): void {
   
  }

  getKRAData() {
    this.loading = true;
    this.emailConfigAPI.getEmailconfig().subscribe(
      (res) => {
        this.data = res;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = err;
      })
  }

 
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.ngOnDestroy();
      this.emailConfigAPI.deleteEmailconfig(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Email Configuration deleted Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open("Error!" + this.error, "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
