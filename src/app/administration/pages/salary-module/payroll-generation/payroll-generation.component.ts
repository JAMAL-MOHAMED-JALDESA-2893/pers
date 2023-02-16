import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BatchService } from 'src/app/Service/BatchService/batch.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { SalaryGenerationService } from 'src/app/Service/SalaryGenerationService/salary-generation.service';
import { environment } from 'src/environments/environment';
import { PayrollService } from '../../../../Service/PayRoll/payroll.service';

@Component({
  selector: 'app-payroll-generation',
  templateUrl: './payroll-generation.component.html',
  styleUrls: ['./payroll-generation.component.scss'],
})
export class PayrollGenerationComponent implements OnInit{
  loading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions!: {
    pagingType: string;
    pageLength: number;
    processing: boolean;
    dom: string;
    buttons: string[];
  };
  departmentData: any;
  e: any;
  error: any;
  employeeData: any;
  batchProcesses: any;
  eachData: any;
  constructor(
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private batchExecutionAPI: BatchService,
    private salaryGenerationAPI: SalaryGenerationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getActiveEmployees();
    this.getData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'print', 'pdf'],
    };
  }
  
  getData() {
    this.batchExecutionAPI
      .getBatchprocesss()
      .subscribe((res) => {
        this.batchProcesses = res;
        console.log(this.batchProcesses);

        // for()
      });
  }

  getActiveEmployees() {
   this.employeeAPI
      .getActiveEmployees()
      .subscribe((res) => {
        this.employeeData = res;

      });
  }

  onExecuteEvent(event_type: any) {
    switch (event_type) {
      case 'Generate Payroll': {
        this.loading = true;
        this.salaryGenerationAPI.generatePayroll().subscribe(
          (res) => {
            this._snackBar.open('Successfully Executed!', 'X', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
            this.loading = false;
          },
          (err) => {
            this.error = err;
            this._snackBar.open(this.error, 'Try again!', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
            this.loading = false;
          }
        );
        break;
      }
      case 'Sent Payroll Report to Director': {
        this.loading = true;
        this._snackBar.open('Event Executed. It may take some time. You may visit this page later to check the progress!', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
         this.salaryGenerationAPI
          .sentPayrollReporttoDirector()
          .subscribe(
            (res) => {
              this._snackBar.open('Successfully Executed!', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              let currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
              this.loading = false;
            },
            (err) => {
              this.error = err;
              this._snackBar.open(this.error, 'Try again!', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
              this.loading = false;
            }
          );

        break;
      }
      case 'Approve & Commit Payroll': {
        this.loading = true;
      this.salaryGenerationAPI
          .approveandCommitPayroll()
          .subscribe(
            (res) => {
              this._snackBar.open('Successfully Executed!', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              let currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
              this.loading = false;
            },
            (err) => {
              this.error = err;
              this._snackBar.open(this.error, 'Try again!', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
              this.loading = false;
            }
          );

        break;
      }
      case 'Generate Payroll Report & Payslips': {
        this.loading = true;
        this._snackBar.open('Event Executed. It may take some time. You may visit this page later to check the progress!', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        let currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
        this.loading = false;
        this.salaryGenerationAPI.generatePayrollReportandPayslips()
          .subscribe(
            (res) => {
              this._snackBar.open('Successfully Executed!', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              let currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
              this.loading = false;
            },
            (err) => {
              this.error = err;
              this._snackBar.open(this.error, 'Try again!', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
              this.loading = false;
            }
          );

        break;
      }
    }
  }
}
