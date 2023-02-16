import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';
const middleName = "";

@Component({
  selector: 'app-absentism-component',
  templateUrl: './absentism-component.component.html',
  styleUrls: ['./absentism-component.component.scss']
})
export class AbsentismComponentComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Departments Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  departmentData: any;
  e: any;
  error: any;
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

  constructor(
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private http: HttpClient
    ) {

    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

    var d = new Date();
    console.log("The current month is " + monthNames[d.getMonth()]);

       const currentDate = new Date()
       this.getYear = currentDate.getFullYear();
       this.getMonth  = monthNames[currentDate.getMonth()]
    }

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


  ngOnInit() {
    this.getData();
    this.getDepartmentData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }


    this.employeeCount();
    this.salaryCount();
    this.getData();

  }
  employeeCount(){
    this.employeeAPI.countEmployees().subscribe( data => {
      this.employeeCountRes = data;
    });
  }


  salaryCount(){
    this.employeeAPI.countSalary().subscribe( data => {
      console.log("The total salary", data);
    });
}

headers = new HttpHeaders().set('Content-Type', 'application/json');

    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll`;

  getData() {
    const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

    const d = new Date();

    this.params = new HttpParams()
    .set('year', this.getYear)
  .set('month', monthNames[d.getMonth()]);


    let API_URL = `${this.baseURL}/findbyMonth`;
    let Totals_URL = `${this.baseURL}/getTotalDeductions`;
    return this.http.get(Totals_URL, { params: this.params, headers: this.headers, withCredentials: false }).subscribe(data => {
      this.totalsData = data;
      this.grossPay = this.totalsData.grossPay;
      this.netPay = this.totalsData.netPay;
      this.payeDeductions = this.totalsData.payeTotals;
      this.nhifDeductions = this.totalsData.nhifTotals;
      this.nssfDeductions = this.totalsData.nssfTotals;
      this.helbDeductions = this.totalsData.helbTotals;
      console.log("Totals are", this.totalsData);
    })


  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  getDepartmentData() {
    this.departmentAPI.getDepartments().subscribe(data => {
      this.departmentData = data;
      // initiate data table
    })
  }
  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.ngOnDestroy();
      this.departmentAPI.deleteDepartment(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Department Successfully Deleted!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open("Error: You can not delete a department which has got employees!", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }

}
