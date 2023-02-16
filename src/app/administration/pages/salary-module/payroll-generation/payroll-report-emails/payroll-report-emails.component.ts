import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-payroll-report-emails',
  templateUrl: './payroll-report-emails.component.html',
  styleUrls: ['./payroll-report-emails.component.scss']
})
export class PayrollReportEmailsComponent implements OnInit, OnDestroy {
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['id','activity_category','activity_name','status','month','year','created_at'];
  dataSource!: MatTableDataSource<any>;
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
  _snackBar: any;
  horizontalPosition: any;
  verticalPosition: any;
  resData: any;

  constructor(
    private employeeAPI: EmployeeService,
    private activityAPI: ActivitiesService,
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
    this.getActivityData();
    // const params = new HttpParams()
    // .set('activity_category', 'Email Reports')
    // .set('month', this.month)
    // .set('year', this.year);
    // this.getSalaryData(params);
    // this.formData = this.fb.group({
    //   year: ['', [Validators.required]],
    //   selectedMonth: ['', [Validators.required]],
    // });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;

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
  getActivityData() {
    console.log("Hey data");
    
    this.params = new HttpParams()
    .set('activity_category', 'Email Report')
    .set('month', this.month)
    .set('year', this.year);
      this.subscription = this.activityAPI.getActivities(this.params).subscribe(res => {
        this.resData = res;
        console.log(res);
        
           // Binding with the datasource
           this.dataSource = new MatTableDataSource(this.resData);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
    })
  }
}
