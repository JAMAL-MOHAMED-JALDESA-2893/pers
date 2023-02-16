import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { map } from 'jquery';
import { Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';

const middleName = "";

@Component({
  selector: 'app-salary-module',
  templateUrl: './salary-module.component.html',
  styleUrls: ['./salary-module.component.scss']
})
export class SalaryModuleComponent  implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;



  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Employees Payroll Details';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;

  monthsArray: any = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  formData: any;

  error = '';
  loading = false;
  salaryData: any;
  params: HttpParams | undefined;
  totalsData:any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  status: any;
  paidStatus: any;

  constructor(
    private employeeAPI: EmployeeService,
    private salaryAPI: SalaryService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
    ) { }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]

    }
    this.initForm();
  }
  // init form values
  public initForm(){
    this.getSalaryData();
    this.formData = this.fb.group({
      year: ['', [Validators.required]],
      selectedMonth: ['', [Validators.required]],
    });

  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;

  submitData() {
    this.loading = true;
    const data = this.formData.value;
    console.log("hey data",data);
    this.params = new HttpParams()
  .set('month', data.selectedMonth);
    let API_URL = `${this.baseURL}/findbyMonth`;
    let Totals_URL = `${this.baseURL}/getTotalDeductions`;
    return this.http.get(Totals_URL, { params: this.params, headers: this.headers, withCredentials: false }).subscribe(data => {
      this.totalsData = data;
      this.payeDeductions = this.totalsData.payeTotals;
      this.nhifDeductions = this.totalsData.nhifTotals;
      this.nssfDeductions = this.totalsData.nssfTotals;
      this.helbDeductions = this.totalsData.helbTotals;
      console.log("Totals are", this.totalsData);
    this.loading = false;
    })
  }

  getSalaryData() {
    // this.dtTrigger.unsubscribe();
    this.salaryAPI.getSalary().subscribe(data => {

      this.salaryData = data;
      this.paidStatus = this.salaryData.paid
      if( this.paidStatus  = true){
        this.status = "Paid"
      }else {
        this.status = "Not Paid"
      }
    })
  }
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.employeeAPI.deleteEmployee(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }

}
