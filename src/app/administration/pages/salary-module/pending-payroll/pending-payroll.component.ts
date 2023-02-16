import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayrollService } from '../../../../Service/PayRoll/payroll.service';

@Component({
  selector: 'app-pending-payroll',
  templateUrl: './pending-payroll.component.html',
  styleUrls: ['./pending-payroll.component.scss']
})
export class PendingPayrollComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['index', 'emp_no', 'fullname', 'id_no', 'acct_no', 'bank', 'nssf_no', 'nhif_no', 'pin_no', 'period_m', 'period_y',
    'salary',
    'nssf',
    'nhif',
    'paye',
    'helb',
    'total_deductions_net_salary',
    'net_salary', 'action'];
  loading: boolean = false;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  monthsArray: any = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  respondedData: any;
  error: any;
  constructor(
    private payrollAPI: PayrollService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }
  ngOnInit() {
    this.getSalaryData();
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
  getSalaryData() {
    this.loading = true;
    this.subscription = this.payrollAPI.getUncommittedPayroll().subscribe(res => {
      this.respondedData = res;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.respondedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }
  onVerifyPayroll(id: any) {
    if (window.confirm('Are you sure you want to approve this payroll?')) {
      this.ngOnDestroy();
      this.subscription = this.payrollAPI.approvePayrollId(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
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
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      })
    }
  }
}
