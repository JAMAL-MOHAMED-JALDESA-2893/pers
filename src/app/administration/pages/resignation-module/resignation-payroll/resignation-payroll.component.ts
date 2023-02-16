import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ResignationpayrollService } from 'src/app/Service/Resignation-Payroll-Service/resignationpayroll.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resignation-payroll',
  templateUrl: './resignation-payroll.component.html',
  styleUrls: ['./resignation-payroll.component.scss']
})
export class ResignationPayrollComponent implements OnInit, OnDestroy {
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dtTrigger: Subject<any> = new Subject<any>();
  title = 'Departments Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  departmentData: any;
  e: any;
  error: any;
  subscription!: Subscription;
  resignationData: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private resignationPayrollAPI: ResignationpayrollService,
    ) {}

  ngOnInit() {
    this.getData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  pay(id:any){
    this.loading = true;
    this.subscription = this.resignationPayrollAPI.payEmployee(id).subscribe(res=>{
      this._snackBar.open("Paid Successfully....Payslip has been sent to employee and directors email!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });

    this.loading = false;
    },err => {
      this.error = err;
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    this.loading = false;
    });

  }
  getData() {
    this.subscription = this.resignationPayrollAPI.getResignationSalary().subscribe(res=>{
      this.resignationData = res;

      console.log("hey data", res)
    }, err=>{
      this.error = err;
    })
  }
}
