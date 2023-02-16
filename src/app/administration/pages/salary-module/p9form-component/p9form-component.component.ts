import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';
import { PayrollService } from '../../../../Service/PayRoll/payroll.service';
@Component({
  selector: 'app-p9form-component',
  templateUrl: './p9form-component.component.html',
  styleUrls: ['./p9form-component.component.scss']
})
export class P9formComponentComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id', 'emp_no', 'first_name', 'other_names',
    'gross_salary', 'netPay', 'services'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  formData: any;
  employee_id: any;
  employeeEmail: any;
  error: any;
  subscription!: Subscription;
  loading = false;
  constructor(
    private employeeAPI: EmployeeService,
    private payrollAPI: PayrollService,
    private authAPI: AuthService,
    private _snackBar: MatSnackBar,
    private reportAPI: ReportService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder,

  ) { }
  ngOnInit() {
    this.getAccounts();
    this.getData();
  }
  getAccounts() {
    this.authAPI.GetAllAccounts().subscribe(data => {
      console.log("hey there are accounts", data);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getData() {
    this.loading = true;
    this.payrollAPI.getBasicEMployeesDetails().subscribe(
      (res) => {
        this.loading = false;
        this.employeeData = res;
        this.dataSource = new MatTableDataSource(this.employeeData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     }
   ) 
  }
  genEmployeeP9(item: any) {
    this.payrollAPI.changeMessage(item)
    this.router.navigateByUrl('administration/employees/generate/yearly/p9form/');
  }
  generatePNineForm() {
    
  }
  downloadPNineForm() {
    
  }
  managePNineForm() {
    
  }

  
  getEmployeeReport() {
    this.reportAPI.generateDocumentReport().subscribe(response => {
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.log(error);
    });
  }
  onCreateAccount(id: any) {
    // initialize form
    this.subscription = this.employeeAPI.getEmployeeId(id).subscribe(user => {
      this.employee_id = user.id.toString();
      this.employeeEmail = user.personalEmail;
      var password = Math.random().toString(36).slice(-8);
      this.formData = this.fb.group({
        username: [this.employeeEmail, [Validators.required]],
        email: [this.employeeEmail, [Validators.required]],
        employee_id: [this.employee_id, [Validators.required]],
        password: [password, [Validators.required]]
      });
      if (this.formData.valid) {
        this.authAPI.createAccount(this.formData.value).pipe(first())
          .subscribe(
            result => {
              this._snackBar.open("Account Successfully Created!", "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              this.ngZone.run(() => this.router.navigateByUrl('administration/accounts'));
            },
            error => {
              this._snackBar.open(error, "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            });

      } else {
        this._snackBar.open("Invalid Form data", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      }
    });
  }
  generatePayslip(id: any) {
    this.loading = true;
    this.subscription = this.reportAPI.generatePayslip(id).subscribe(response => {
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
      console.log(error);
      this.loading = false;
    });
  }

  generateP9form(id: any) {
    this.loading = true;
    this.subscription = this.reportAPI.generateP9form(id).subscribe(response => {
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
      console.log(error);
      this.loading = false;
    });
  }

  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.employeeAPI.deleteEmployee(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        this.dtTrigger.unsubscribe();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
