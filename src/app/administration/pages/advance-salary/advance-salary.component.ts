import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdvanceSalaryService } from 'src/app/Service/AdavanceSalary/advance-salary.service';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

export interface  ApiData {
  id:String;
  firstName:String;
  middleName:String;
  lastName:String;
  departmentName      :String;
  salary_amount:String;
  month:String;
  year:String;
  status:String;
  user_identity:String;
  created_at:String;
  updated_at:String;
}
        
@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrls: ['./advance-salary.component.scss']
})
export class AdvanceSalaryComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = [ 'index','firstName','middleName','lastName','departmentName',
  'salary_amount','month','year','status','user_identity', 'created_at','updated_at','action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData:any;
  showCreateButton =  false;
  showUpdateButton =  false;
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
  disabled =  false;
  executive: any;
  

  constructor(    
    private advanceSalaryAPI: AdvanceSalaryService,
    private employeeAPI: EmployeeService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    ) { }
    ngOnInit() {
      this.getData();
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
 

    getData() {
      // Using employee id i can get the department at which the employee is head of
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    const employee_id = currentUser.id;
    this.subscription = this.employeeAPI.getEmployeeId(employee_id).subscribe(empdata=>{
      let department_id = empdata.departmentId;
      console.log("department id", department_id)
      // get roles
      this.role = currentUser.roles[0];
      // First Level Authorization - Admin
      if(this.role == "ROLE_DIRECTOR"){
        this.subscription = this.advanceSalaryAPI.getAdvanceSalarys().subscribe( res=>{
          this.data = res;
           // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }, err=>{
        });    
      } else if 
      // Second Level AUthorization - Admin/HR
      (this.role == "ROLE_HR"){
        this.subscription = this.advanceSalaryAPI.getAdvanceSalarys().subscribe( res=>{
          this.data = res;
        
           // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }, err=>{
        });
      }else if(this.role == "ROLE_SUPERVISOR"){
        // COMES Fetch by department
        this.subscription = this.advanceSalaryAPI.getDepartmentAdvanceSalarys(department_id).subscribe( res=>{
          this.data = res;
          if(this.data.user_identity = "Administrator"){
            this.disabled = true;
          }
              }, err=>{
        });
      }
    })
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
}

