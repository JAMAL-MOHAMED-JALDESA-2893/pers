import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdvanceSalaryService } from 'src/app/Service/AdavanceSalary/advance-salary.service';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { AllowanceService } from 'src/app/Service/AllowanceService/allowance.service';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReviewAllowanceComponent } from './review-allowance/review-allowance.component';

export interface ApiData {
  id: String;
  firstname: String;
  middlename: String;
  lastname: String;
  departmentname: String;
  amount: String;
  allowance_for: String;
  month: String;
  year: String;
  is_director_approved: String;
  created_at: String;
  updated_at: String;
}
@Component({
  selector: 'app-allowances',
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss']
})
export class AllowancesComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['index', 'fullname', 'departmentname',
    'amount', 'allowance_for', 'month', 'year', 'is_director_approved', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  showCreateButton = false;
  showUpdateButton = false;
  role: any;
  employeeCountRes: any;
  getMonth: any;
  getYear: any;
  params: any;
  totalsData: any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  grossPay: any;
  netPay: any;
  Level: any;
  disabled = false;
  executive: any;
  departmentData: any;
  e: any;
  allowanceData: any;
  is_Director = false;
  allowance_closed = false;


  constructor(
    private advanceSalaryAPI: AdvanceSalaryService,
    private employeeAPI: EmployeeService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private allowanceAPI: AllowanceService,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }
  ngOnInit() {
    this.getData();
    this.Authorize();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  Authorize() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[1];

    // First Level Authorization - Admin
    if (this.role == "ROLE_DIRECTOR") {
      this.is_Director = true;
    } else {
      this.is_Director = false;
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  formData = this.fb.group({
    is_director_approved: ['Approved']
  });
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  getData() {
    this.subscription = this.allowanceAPI.getAllowances().subscribe(res => {
      this.data = res;
      console.log("Console.log data", res);
      if (this.data.is_approved) {
        this.allowance_closed = true;
      }
      else if (this.data.is_rejected) {
        this.allowance_closed = false;
      } 
      else if (this.data.is_paid) {
        this.allowance_closed = true;
      }
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, err => {
      this.error = err;
    })
  }
  rejectDialog(id: any) {
    const dialogRef = this.dialog.open(ReviewAllowanceComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  directorApprove(id: any) {
    this.subscription = this.allowanceAPI.directorApprove(id).subscribe(res => {
      this._snackBar.open("Successful!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, err => {
      this.error = err;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

