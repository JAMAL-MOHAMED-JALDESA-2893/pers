import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AdvanceSalaryService } from 'src/app/Service/AdavanceSalary/advance-salary.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';

const middleName = "";


@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrls: ['./advance-salary.component.scss']
})
export class AdvanceSalaryComponent implements OnInit, OnDestroy {
  displayedColumns = ['salary_amount', 'month', 'year', 'status', 'created_at', 'updated_at', 'actions']
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
  subscription! : Subscription;
  data: any;
  currentUser: any;
  id: any;
  inProcess = true;

  constructor(
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private ngZone: NgZone,
    private employeeAPI: EmployeeService,
    private advanceSalaryAPI: AdvanceSalaryService,
    private http: HttpClient
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
    this.getData();
  }
  employeeCount(){
    this.employeeAPI.countEmployees().subscribe( data => {
      this.employeeCountRes = data;
    });
  }


  getData() {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.id = this.currentUser.id;
    this.subscription = this.advanceSalaryAPI.getAdvanceSalaryByEmployeeId(this.id).subscribe( res=>{
      this.data = res;
      
      if(this.data.status == "Generated"){
        this.inProcess = false;
      }
      
    }, err=>{
    });
  }

  ngOnDestroy(): void {
  }

onProcessing(id: any){
  this.subscription = this.advanceSalaryAPI.onProcessing(id).subscribe(res=>{
    this._snackBar.open("Updated Successfully Created!", "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['green-snackbar','login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }, err=>{
    this.error = err
    this._snackBar.open(this.error, "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
  })
}
onApprove(id: any){
  this.subscription = this.advanceSalaryAPI.onApprove(id).subscribe(res=>{
    this._snackBar.open("Updated Successfully Created!", "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['green-snackbar','login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }, err=>{
    this.error = err;
    this._snackBar.open(this.error, "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
  })
}
onDisburse(id :any){
  this.subscription = this.advanceSalaryAPI.onDisburse(id).subscribe(res=>{
    this._snackBar.open("Updated Successfully Created!", "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['green-snackbar','login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }, err=>{
    this.error = err;
    this._snackBar.open(this.error, "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
  })
}
onDelete(itemId:any){
  this.subscription = this.advanceSalaryAPI.deleteAdvanceSalary(itemId).subscribe(res=>{
    this._snackBar.open("Successful!", "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['green-snackbar','login-snackbar'],
    });

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }, err=>{
    this.error = err;
    this._snackBar.open(this.error, "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
  })
}

}
