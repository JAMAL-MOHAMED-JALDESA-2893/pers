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

const middleName = "";


@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();
  displayedColumns: string[] = [
    'index',
    'PFNO',
    'FullName',
    'IDNUmber',
    'Occupation',
    'GrossPAY',
    'Service',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = false;

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  _emp_data: any;
  e: any;
  middleName: string | undefined;
  formData: any;
  employee_id: any;
  employeeEmail: any;
  error: any;

  constructor(
    private employeeAPI: EmployeeService,
    private authAPI: AuthService,
    private _snackBar: MatSnackBar,
    private reportAPI: ReportService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder,

    ) { }
  ngOnInit() {
    this.getAllActiveEmployees();
    this.getAccounts();
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
  }
  getAccounts(){
    this.authAPI.GetAllAccounts().subscribe( data =>{
      console.log("hey there are accounts", data);
    });
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
    // this.dtTrigger.unsubscribe();
  }
  getData() {
    this.employeeAPI.getActiveEmployees().subscribe(data => {
      this.employeeData = data;
    })
  }

  getAllActiveEmployees() {
    this.loading = true;
    this.employeeAPI.getActiveEmployees().subscribe(
      (res) => {
        this._emp_data = res;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this._emp_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = err;
      })
  }
  getEmployeeReport() {
    this.reportAPI.generateDocumentReport().subscribe(response => {
      console.log(response);
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
    });}

    onCreateAccount(id: any){
      // initialize form
      this.employeeAPI.getEmployeeId(id).subscribe(user => {
        this.employee_id = user.id.toString();
        this.employeeEmail = user.personalEmail;
        var password = Math.random().toString(36).slice(-8);

        this.formData = this.fb.group({
          username: [this.employeeEmail, [Validators.required]],
          email: [this.employeeEmail, [Validators.required]],
          employee_id: [this.employee_id , [Validators.required]],
          password: [password, [Validators.required]]
        });
        console.log("account", this.formData.value);

        if(this.formData.valid){

          this.authAPI.createAccount(this.formData.value).pipe(first())
          .subscribe(
            result => {

                this._snackBar.open("Account Successfully Created!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
                  this.ngZone.run(() => this.router.navigateByUrl('administration/accounts'));
              },
              error => {

        this._snackBar.open(error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
    console.log("eerrors", error)
              });

            }else{
        this._snackBar.open("Invalid Form data", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
            }
      });

    }
    onPayAll(){
      if (window.confirm('Are you sure you want to pay all employees?')) {
        this.employeeAPI.onPayAllEmployees().subscribe( res =>{this._snackBar.open("Paid All Employee Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.ngZone.run(() => this.router.navigateByUrl('/administration/employees/bank_transfer'));
        }, error =>{
          this._snackBar.open("Failed to pay employees", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })

      }
    }
    onPayIndividual(id: any){
      if (window.confirm('Are you sure you want to  pay this employee only?')) {

      }
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
