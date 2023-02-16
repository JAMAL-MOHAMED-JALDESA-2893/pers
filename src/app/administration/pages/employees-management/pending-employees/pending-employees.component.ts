import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

export interface  ApiData {
  id:String;
  firstName:String;
  middleName:String;
  lastName:String;
  personalPhone:String;
  personalEmail:String;
  basic_salary:String;
  is_approved:String;
}

@Component({
  selector: 'app-pending-employees',
  templateUrl: './pending-employees.component.html',
  styleUrls: ['./pending-employees.component.scss']
})
export class PendingEmployeesComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','firstName','middleName','lastName','personalPhone','personalEmail','basic_salary','is_approved','action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  loading: boolean = false;

  constructor(    
    private employeeAPI: EmployeeService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
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
    this.loading = true;
      this.subscription = this.employeeAPI.getUnApprovedEmployees().subscribe(res => {
       this.data = res;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      })
    }
    onApprove(id: any){
      if (window.confirm('Are you sure you want to Approve this employee instantly?')) {
      this.employeeAPI.ApproveEmployee(id).subscribe( res=>{
        this._snackBar.open("Employee Approved Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
      });
      // redirect to active employees
        this.ngZone.run(() => this.router.navigateByUrl('administration/employees/active'));
    }
    }
    onDelete(id: any) {
      if (window.confirm('Are you sure you want to put on trash?')) {
        this.employeeAPI.softDeleteEmployee(id).subscribe(res => {
          // call to destro an instance
          this.ngOnDestroy();
          this.ngZone.run(() => this.router.navigateByUrl('administration/employees/trashed'));
  
        })
      }
    }
}
