import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { param } from 'jquery';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';

const middleName = "";

@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-accounts.component.html',
  styleUrls: ['./pending-accounts.component.scss']
})
export class PendingAccountsComponent implements  OnInit, OnDestroy {
  rolesArray: any = [
    'ROLE_ADMIN',
	  'ROLE_USER',
    'ROLE_DIRECTOR',
    'ROLE_SUPERVISOR',
  ]
  dtTrigger: Subject<any> = new Subject<any>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  formData: any;
  employee_id: any;
  employeeEmail: any;
  error: any;
  accountsData: any;
  role: any;
  rolesData: any;
  loading = false;
  getRole: any;
  currentRole: any;
  userroles: any;


  constructor(
    private employeeAPI: EmployeeService,
    private authAPI: AuthService,
    private _snackBar: MatSnackBar,
    private reportAPI: ReportService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder,

    ) { }

    FormData = this.fb.group({
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

  ngOnInit() {
    this.getPendingAccounts();
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
  getPendingAccounts(){
    this.authAPI.GetAllPendingAccounts().subscribe( data =>{
      this.accountsData = data
      console.log("hey data", this.accountsData.email)
      this.userroles = this.accountsData.roles[0].name
      for(let i = 0; i <= this.accountsData.length; i++){
        this.getRole = this.accountsData[i].roles[0].name
        console.log("hey roles work",this.getRole )
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // initialiseForm(){
  //   this.authAPI.GetAllAccounts().subscribe( data =>{
  //     this.accountsData = data
  //     for(let i=0; i<data.length; i++){
  //       let email = data[i].email

  // this.FormData = this.fb.group({
  //       email: [email, [Validators.required]],
  //       role: ['', [Validators.required]],
  //     });

  //     }
  //     // this.FormData = this.fb.group({
  //     //   email: [this.accountsData.email, [Validators.required]],
  //     //   role: ['', [Validators.required]],
  //     // });

  //   });
  // }



      get f() { return this.FormData.controls; }

    submitData() {
      console.log("Hey it works", this.FormData.value)
     this.loading = true;
     if (window.confirm('Are you sure you want to change roles for this employee?')) {
      if(this.FormData.valid){
        console.log("Hey it works", this.FormData.value)
        const email = this.f.email.value;
        const role =  this.f.role.value;
        const params = new HttpParams()
        .set('email',email)
      .set('role', role);

        this.authAPI.updateRole(params).pipe(first())
        .subscribe(
          result => {
            this.loading = false;
              this._snackBar.open("Role Successfully Updated!", "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar','login-snackbar'],
              });
                this.ngZone.run(() => this.router.navigateByUrl('/administration/departments'));
            },
            error => {
                this.error = error.message;
            });

          }else{
            this.loading = false;
      this._snackBar.open("Invalid Form data", "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
          }
        }


    }
    // approve/account/by/employee/
    // /all/approved/employees/accounts

    onApprove(email: any){
      if (window.confirm('Are you sure you want to approve this employee accoun request?')) {     const params = new HttpParams()
        .set('username',email)
        this.authAPI.approveEmployee(params).subscribe( res=>{
          this._snackBar.open("Role Successfully Approved!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar','login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('/administration/accounts'));
          
        }, err=>{
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });

        });

      }
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

