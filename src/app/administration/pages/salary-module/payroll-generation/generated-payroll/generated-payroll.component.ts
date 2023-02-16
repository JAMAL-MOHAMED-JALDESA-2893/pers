import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { PayrollService } from 'src/app/Service/PayRoll/payroll.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';


export interface SalaryData {
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  personalPhone: string;
  jobGroup: string;
  bankName: string;
  bankAccount: string;
  gross_salary: string;
  kraNo: string;
  payeDeductions: string;
  nssfNo: string;
  nssfDeductions: string;
  nhifNo: string;
  nhifDeductions: string;
  helbDeductions: string;
  netPay: string;
  month: string;
  year: string;
  createdAt: string;
}


@Component({
  selector: 'app-generated-payroll',
  templateUrl: './generated-payroll.component.html',
  styleUrls: ['./generated-payroll.component.scss']
})
export class GeneratedPayrollComponent implements OnInit {
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['id', 'emp_no', 'fullName', 'nationalId',
    'gross_salary','payeDeductions', 'nssfDeductions', 'nhifDeductions', 'netPay', 'action'];
  dataSource!: MatTableDataSource<SalaryData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  monthsArray: any =
    [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'July', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
  commits = [
    {
      id: 1,
      value: 'true',
      name: 'Committed'
    },
    {
      id: 2,
      value: 'false',
      name: 'Uncommited'
    }
  ]

  salaryData: any;
  paidStatus: any;
  status!: string;
  totalsData: any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  loading = false;
  formData: any;
  params: any;
  error = '';
  data: any;
  _snackBar: any;
  horizontalPosition: any;
  verticalPosition: any;
  max: any;
  min: any;
  displayMax: any;
  month: any;
  year: any;
  yearValue: any;
  monthValue: any;
  commitValue: any;
  years: any;
  currentYear: any;
  role: any;
  showdit: any;
  is_salary_committed: boolean = false;
  is_salary_committed_edit: boolean = false;
  constructor(
    private employeeAPI: EmployeeService,
    private salaryAPI: SalaryService,
    public fb: FormBuilder,
    private payrollService: PayrollService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) { }
  ngOnInit() {
    //this.initForm();
    this.Authorize();
    this.getYears();
  }
  Authorize() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[1];
    console.log("User BY role ", this.role);
    // First Level Authorization - Admin
    if (this.role == "ROLE_DIRECTOR") {
      this.is_salary_committed = true;
      this.is_salary_committed_edit = true;
    } else {
      //this.is_salary_committed_edit = false;
    }
    this.getUncommitedPerMonth();
  }
  getYears() {
    this.years = Array();
    this.currentYear = new Date().getFullYear();
    for (let i = (this.currentYear - 5);
      i < (this.currentYear + 1); i++) {
      this.years.push(i);
    }
  }
  onSelectedYear(e: any) {
    this.yearValue = e.value;
  }
  onSelectedMonth(e: any) {
    this.monthValue = e.value;
  }
  onSelectedCommit(e: any) {
    this.commitValue = e.value;
    this.getUncommitedPerMonth();
  }
  getUncommitedPerMonth() {
    this.loading = true;
    this.params = new HttpParams()
      .set('month', this.monthValue)
      .set('year', this.yearValue)
      .set('committedStatus', this.commitValue);
    this.payrollService.commitedPayRollsPerYear(this.params).subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
        // this.showdit = Object.keys(this.data.filter((data: { evaluationStatus: string; }) => data.evaluationStatus == 'new')).length
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },)
  }
  updateBasicSalary(id: any) {
    this.router.navigate([`/administration/employee/basic-salary/update/${id}`]);
  }
  viewPayRoll(id: any) {
    this.router.navigate([`/administration/employee/salary/payroll-details/${id}`]);
  }
  
  // init form values
  // public initForm(){
  //   const params = new HttpParams()
  //   .set('month', this.month)
  //   .set('year', this.year);
  //   this.getSalaryData(params);
  //   this.formData = this.fb.group({
  //     year: ['', [Validators.required]],
  //     selectedMonth: ['', [Validators.required]],
  //   });
  // }
  /* Get errors */
  // public handleError = (controlName: string, errorName: string) => {
  //   return this.formData.controls[controlName].hasError(errorName);
  // };
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  //     // API endpoint
  //   baseURL = `${environment.apiUrl}/api/v1/payroll`;

  // submitData() {
  //   this.loading = true;
  //   const data = this.formData.value;
  //   console.log("hey data",data);
  //   const params = new HttpParams()
  //   .set('year', data.year)
  // .set('month', data.selectedMonth);
  // // set data for table
  // const dataParams = new HttpParams()
  //   .set('month', data.selectedMonth) 
  //   .set('year', data.year);
  //   this.getSalaryData(dataParams);
  //   let API_URL = `${this.baseURL}/findbyMonth`;
  //   let Totals_URL = `${this.baseURL}/getTotalDeductions`;
  //   return this.http.get(Totals_URL, { params: params, headers: this.headers, withCredentials: false }).subscribe(data => {
  //     this.totalsData = data;
  //     this.payeDeductions = this.totalsData.payeTotals;
  //     this.nhifDeductions = this.totalsData.nhifTotals;
  //     this.nssfDeductions = this.totalsData.nssfTotals;
  //     this.helbDeductions = this.totalsData.helbTotals;
  //     console.log("Totals are", this.totalsData);
  //   this.loading = false;

  //   })
  // }

  // getSalaryData(params: any) {
  //     this.subscription = this.salaryAPI.getUnCommitedSalary().subscribe(res => {
  //          // Binding with the datasource
  //          this.dataSource = new MatTableDataSource(res);
  //          this.dataSource.paginator = this.paginator;
  //          this.dataSource.sort = this.sort;
  //   })
  // }
  
  
  onApprove(id: any) {
    console.log("salary id", id)
    if (window.confirm('Are you sure you want to commmit the salary for this employee? this process can not be reverted')) {
      this.salaryAPI.commitEmployeeSalary(id).subscribe(res => {
        this._snackBar.open("Commited the salary Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      })
    }
  }
  commitAllPayments() {
    if (window.confirm("Are You Sure You Want To COMMIT ALL PAYMENTS? This Action can not be REVERSED")){
      let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
    } else {
      let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
    }
  }

  generateAllPayments() {
    this.payrollService.generatePAYROLL().subscribe(
      (res) => {
        this.data = res;
        console.log("Generated PayRoll", this.data);
        
      }
    )
  }

  // onCommitAll() {
  //   if (window.confirm('Are you sure you want to commit all payments? This action can never be reverted')) {
  //     var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //     var d = new Date();
  //     let currentMonth = monthNames[d.getMonth()]
  //     let currentYear = d.getFullYear();
  //     let params = new HttpParams()
  //       .set('month', currentMonth)
  //       .set('year', currentYear);
  //     this.salaryAPI.commitAllEmployeeSalary(params).subscribe(res => {
  //       let currentUrl = this.router.url;
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate([currentUrl]);
  //       });
  //       this._snackBar.open("Commited the salary Successfully!", "X", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: 3000,
  //         panelClass: ['green-snackbar', 'login-snackbar'],
  //       });
  //     })
  //   } else {
  //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //       this.router.navigate(['']);
  //     })
  //   }
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
