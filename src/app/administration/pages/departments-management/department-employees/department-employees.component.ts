import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-employees',
  templateUrl: './department-employees.component.html',
  styleUrls: ['./department-employees.component.scss']
})
export class DepartmentEmployeesComponent  implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
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
  monthLoading = false;
  yearLoading = false;

  salaryData: any;
  params: HttpParams | undefined;
  respondData: any;
  departmentData: any;
  employeeCountRes: any;
  getMonth: any;
  getYear: any;
  totalsData: any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  grossPay: any;
  netPay: any;
  departmentName: any;
  id: any;
  resData: any;
  countEmployee: any;

  constructor(
    private employeeAPI: EmployeeService,
    private actRoute: ActivatedRoute,
    private departmentAPI: DepartmentService,
    private reportAPI: ReportService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private salaryAPI: SalaryService,
    private http: HttpClient
  ) {

    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

    var d = new Date();

       const currentDate = new Date()
       this.getYear = currentDate.getFullYear();
       this.getMonth  = monthNames[currentDate.getMonth()]
    }
    monthlyForm = this.fb.group({
        year: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(4),Validators.maxLength(4)]],
        month:['', [Validators.required]],
      });

      yearForm = this.fb.group({
        year: ['', [Validators.required]],
      });

    saleData = [
      { name: "January", value: 10500 },
      { name: "February", value: 15500 },
      { name: "March", value: 15000 },
      { name: "April", value: 15000 },
      { name: "May", value: 17000 },
      { name: "June", value: 19000 },
      { name: "July", value: 20000 },
      { name: "August", value: 21000 },
      { name: "September", value: 26000 },
      { name: "October", value: 11000 },
      { name: "November", value: 18000 },
      { name: "December", value: 23000 }
    ];

  ngOnInit(): void {
    // this.getDepartmentData();
    this.getDepartmentEmployees();
    this.getDepartmentSalaryData();
    this.employeeCount();
    this.salaryCount();
    this.getData();
    this.initializeMonthlyForm();
    this.initializeYearlyForm();
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

  getDepartmentSalaryData(){
    const department_id = this.actRoute.snapshot.paramMap.get('id');
    this.salaryAPI.getDepartmentMonthlySalary(department_id).pipe(map((res: any) => res.map((data: any) => {
      return {
        name: data.month,
        value: data.monthlySalary,
      }
    }))).subscribe( results => {
      this.resData = results;
    });
  }



  initializeMonthlyForm(){
    this.monthlyForm = this.fb.group({
      year: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(4),Validators.maxLength(4)]],
      month:['', [Validators.required]],
    });
  }
  initializeYearlyForm(){
    this.yearForm = this.fb.group({
      year: ['', [Validators.required]],
    });
  }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.formData.controls[controlName].hasError(errorName);
    };

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

//   ngAfterViewInit(): void {
//
// }


headers = new HttpHeaders().set('Content-Type', 'application/json');

baseURL = `${environment.apiUrl}/api/v1/employees`;



  getDepartmentEmployees(){
const id = this.actRoute.snapshot.paramMap.get('id');
    this.params = new HttpParams().set('dp_Id', id!);
    let API_URL = `${this.baseURL}/find/employee/Department`;
    return this.http.get(API_URL, { params: this.params, headers: this.headers, withCredentials: false }).subscribe(data => {
      this.respondData = data;
      this.countEmployee = Object.keys(data).length;
    })
  }




employeeCount(){
  this.employeeAPI.countEmployees().subscribe( data => {
    this.employeeCountRes = data;
  });
}


salaryCount(){
  this.employeeAPI.countSalary().subscribe( data => {
  });
}


  // API endpoint

getData() {
this.id = this.actRoute.snapshot.paramMap.get('id');
  const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  const d = new Date();
  this.params = new HttpParams()
  .set('year', this.getYear)
.set('month', monthNames[d.getMonth()])
.set('department_id', this.id);

const payrollURL = `${environment.apiUrl}/api/v1/payroll`;
  let Totals_URL = `${payrollURL}/getDepartmentsTotalDeductions`;
  return this.http.get(Totals_URL, { params: this.params, headers: this.headers, withCredentials: false }).subscribe(data => {
    this.totalsData = data;
    this.grossPay = this.totalsData.grossPay;
    this.netPay = this.totalsData.netPay;
    this.payeDeductions = this.totalsData.payeTotals;
    this.nhifDeductions = this.totalsData.nhifTotals;
    this.nssfDeductions = this.totalsData.nssfTotals;
    this.helbDeductions = this.totalsData.helbTotals;
  })

}


  // getDepartmentData() {
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //   this.departmentAPI.getDepartmentId(id).subscribe(data => {
  //     this.departmentData = data;
  //     this.departmentName = this.departmentData.departmentName;
  //
  //   })
  // }

  generateAnnualReport() {
    this.loading = true;
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.params = new HttpParams()
  .set('year', 2021)
  .set('department_id',this.id)
  .set('Department_Name',"Finacle Department");
    this.reportAPI.generateAnnualDepartmentReport(this.params).subscribe(response => {
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', '_blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    this.loading = false;
    }, error => {
    this.loading = false;
    });
  }
    generateMonthlyReport() {
      this.loading = true;
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.params = new HttpParams()
    .set('year', 2021)
    .set('department_id',this.id)
    .set('Department_Name',"Finacle Department")
    .set('month',"Finacle Department");
      this.reportAPI.generateMonthlyDepartmentReport(this.params).subscribe(response => {
        let url = window.URL.createObjectURL(response.data);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', '_blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      this.loading = false;
      }, error => {
      this.loading = false;
      });
    }

    get yF() { return this.yearForm.controls; }

      yearData(){
        this.yearLoading = true;
        let year =  this.yF.year.value;
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.params = new HttpParams()
      .set('year', year)
      .set('department_id',this.id)
      .set('Department_Name',"Finacle Department");
        this.reportAPI.generateAnnualDepartmentReport(this.params).subscribe(response => {
          let url = window.URL.createObjectURL(response.data);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.setAttribute('target', '_blank');
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          this.yearLoading= false;
          this._snackBar.open("Report Successfully Generated!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar','login-snackbar'],
          });

        }, error => {
          this._snackBar.open("No data for this period", "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
          this.yearLoading = false;
        });

      }


    get mF() { return this.monthlyForm.controls; }
      monthData(){
        this.monthLoading = true;
        let year =  this.mF.year.value;
        let month =  this.mF.month.value;
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.params = new HttpParams()
      .set('year', year)
      .set('department_id',this.id)
      .set('Department_Name',"Finacle Department")
      .set('month',month);
        this.reportAPI.generateMonthlyDepartmentReport(this.params).subscribe(response => {
          let url = window.URL.createObjectURL(response.data);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.setAttribute('target', '_blank');
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          this._snackBar.open("Report Successfully Generated!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar','login-snackbar'],
          });
          this.monthLoading = false;
        }, error => {
          this._snackBar.open("No data for this period", "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
          this.monthLoading = false;
        });
      }

}
