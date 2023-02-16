import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

export interface ApiData {
  id: String;
  firstName: String;
  middleName: String;
  lastName: String;
  personalPhone: String;
  personalEmail: String;
  basic_salary: String;
  is_approved: String;
  have_account: String;

}
@Component({
  selector: 'app-inactive-employees',
  templateUrl: './inactive-employees.component.html',
  styleUrls: ['./inactive-employees.component.scss']
})
export class InactiveEmployeesComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['index', 'firstName', 'middleName', 'lastName', 'personalPhone', 'personalEmail', 'basic_salary', 'is_approved', 'have_account', 'action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData: any;
  loading: boolean = false;


  constructor(
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
    this.loading = true;
    this.subscription = this.employeeAPI.getInactiveEmployees().subscribe(res => {
      this.data = res;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  onCreateAccount(id: any) {
    this.creatingAccount = true;
    // initialize form
    this.employeeAPI.getEmployeeId(id).subscribe(user => {
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
              this.creatingAccount = false;
              this.ngZone.run(() => this.router.navigateByUrl('administration/accounts'));
            },
            error => {
              this._snackBar.open(error, "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
              this.creatingAccount = false;
            });
      } else {
        this._snackBar.open("Invalid Form data", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
        this.creatingAccount = false;
      }
    });

  }
  onDelete(id: any) {
    if (window.confirm('Are you sure you want to put on trash?')) {
      this.employeeAPI.softDeleteEmployee(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        this.ngZone.run(() => this.router.navigateByUrl('administration/employees/trashed'));

      })
    }
  }
}
