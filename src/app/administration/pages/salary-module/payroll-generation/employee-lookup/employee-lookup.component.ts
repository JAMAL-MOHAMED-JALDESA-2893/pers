import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { PayrollService } from '../../../../../Service/PayRoll/payroll.service';

@Component({
  selector: 'app-employee-lookup',
  templateUrl: './employee-lookup.component.html',
  styleUrls: ['./employee-lookup.component.scss']
})
export class EmployeeLookupComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['index','emp_no','first_name','other_names','id_no','acct_no','bank','nssf_no','nhif_no','pin_no','period_m','period_y',
  'salary',
  'nssf',
  'nhif',
  'paye',
  'helb',
  'total_deductions_net_salary',
  'net_salary','action'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  monthsArray: any = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  respondedData:any;
  error: any;
  constructor(
    private payrollAPI: PayrollService,
    private employeeAPI: EmployeeService,
    private router: Router,
    private _snackBar: MatSnackBar,

    ) { }
    ngOnInit() {
      this.getSalaryData();
    }
    ngOnDestroy(): void {
     // this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getData(){
     

    }
  getSalaryData() {
    this.payrollAPI.getUncommittedPayroll().subscribe(res => {
      this.respondedData = res;
           // Binding with the datasource
           this.dataSource = new MatTableDataSource(this.respondedData);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
    })
  }
  onVerifyPayroll(id:any){
    if (window.confirm('Are you sure you want to approve this payroll?')) {
      this.ngOnDestroy();
      this.payrollAPI.approvePayrollId(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.ngOnDestroy();
      this.subscription = this.payrollAPI.deletePayroll(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }
}
