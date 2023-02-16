import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';
import { PayrollService } from '../../../../Service/PayRoll/payroll.service';


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
  selector: 'app-kra-returns',
  templateUrl: './kra-returns.component.html',
  styleUrls: ['./kra-returns.component.scss']
})
export class KraReturnsComponent  implements OnInit, OnDestroy {
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['id','emp_no','first_name','other_names','id_no','pin_no','period_m','period_y',
  'salary',
  'paye',
];
  dataSource!: MatTableDataSource<SalaryData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  monthsArray: any = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
    d = new Date();
    currentDate = new Date()
    year = this.currentDate.getFullYear();
    month = this.monthsArray[this.d.getMonth()]
  salaryData: any;
  paidStatus: any;
  status!: string;
  totalsData:any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  loading = false;
  formData: any;
  params: any;
  error = '';
  constructor(
    private employeeAPI: EmployeeService,
    private payrollAPI: PayrollService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
    ) { }
    ngOnInit() {
      this.initForm();
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
      // init form values
  public initForm(){
    const params = new HttpParams()
    .set('month', this.month)
    .set('year', this.year);
    this.getSalaryData(params);
    this.formData = this.fb.group({
      year: ['', [Validators.required]],
      selectedMonth: ['', [Validators.required]],
    });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;

  submitData() {
    this.loading = true;
    const data = this.formData.value;
    const params = new HttpParams()
    .set('year', data.year)
  .set('month', data.selectedMonth);
  // set data for table
  const dataParams = new HttpParams()
    .set('month', data.selectedMonth)
    .set('year', data.year);
    this.getSalaryData(dataParams);
 
  }

  getSalaryData(params: any) {
    this.subscription = this.payrollAPI.getSalaryByYearAndMonth(params).subscribe(res => {
           // Binding with the datasource
           this.dataSource = new MatTableDataSource(res);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
    })
  }
}
