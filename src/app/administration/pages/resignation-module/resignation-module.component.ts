import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ClearenceService } from 'src/app/Service/ClearenceService/clearence.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';


@Component({
  selector: 'app-resignation-module',
  templateUrl: './resignation-module.component.html',
  styleUrls: ['./resignation-module.component.scss']
})
export class ResignationModuleComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();
  title = 'Clearence Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  employeeLeaves: any;
  employeeCount: any;
  reportingTo: any;
  clearenceData: any;
  respond: any;
  respData: any;
  formData: any;
  error: any;
  role: any;
  dataRes: any;
  disabled = false;

  constructor(
    private clearenceAPI: ClearenceService,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private ngZone: NgZone,
    private employeeAPI: EmployeeService,
    private tokenStorage: TokenStorageService
    ) { }


  ngOnInit() {

    this.getResignation();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [

      ]
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  getResignation() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[0];
    // get authorized data
    this.employeeAPI.getEmployeeId(currentUser.id).subscribe(res=>{
      this.dataRes = res;
      console.log("emplooyeeccssca data", res)
    // First Level Authorization - Admin
    console.log("role", this.role)
    if(this.role == "ROLE_DIRECTOR"){
      this.clearenceAPI.getAllClearence().subscribe(data => {

        this.respData = data;

        if(this.respData[0].clearence_status == "Approved"){
          this.disabled = true;
        }
      })
    }
    // Second Level AUthorization - Admin/HR
    if(this.role == "ROLE_DIRECTOR" || this.role == "ROLE_HR"){
      this.clearenceAPI.getAllClearence().subscribe(data => {
        this.respData = data;
        if(this.respData[0].clearence_status == "Approved"){
          this.disabled = true;
        }
      })
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    if(this.role == "ROLE_SUPERVISOR"){
      this.clearenceAPI.getClearenceByDepartmentId(this.dataRes.departmentId).subscribe(data => {
        this.respData = data;
        if(this.respData[0].clearence_status == "Approved"){
          this.disabled = true;
        }
      })
    }
    })

  }

  // getClearenceByDepartmentId

  getData() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log("employee id", currentUser );
    const employee_id = currentUser.id;
    console.log("employee id", employee_id );
    this.clearenceAPI.getClearenceByEmployeeId(employee_id).subscribe(data => {
      console.log("Hey responded data", data);
      this.clearenceData = data;
      // initiate data table

    })
  }
   onApprove(id: any){
    if (window.confirm('Are you sure you want to approve?')) {
      let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      this.role = currentUser.roles[0];
      // get authorized data
      this.employeeAPI.getEmployeeId(currentUser.id).subscribe(res=>{
        this.dataRes = res;
        console.log("emplooyeeccssca data", res)
      // First Level Authorization - Admin
      console.log("role", this.role)
      if(this.role == "ROLE_DIRECTOR"){

      this.formData = this.fb.group({
        clearence_status: ['Approved'],
        is_Director_approved : ['true']
      });
      this.clearenceAPI.directorCheck(id, this.formData.value).subscribe(res=>{
        this._snackBar.open("Approved Successfully!", "X", {
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
        this._snackBar.open(this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })


      }
      // Second Level AUthorization - Admin/HR
      if(this.role == "ROLE_HR"){
      this.formData = this.fb.group({
        clearence_status: ['Approved'],
        is_hr_approved: ['true']
      });
      this.clearenceAPI.hrCheck(id, this.formData.value).subscribe(res=>{
        this._snackBar.open("Approved Successfully!", "X", {
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
        this._snackBar.open(this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })

      }
      // Third Level AUthorization - Admin/HR/Supervisor
      if(this.role == "ROLE_SUPERVISOR"){
        this.formData = this.fb.group({
          clearence_status: ['Approved'],
          is_supervisor_approved : ['true']
        });
        this.clearenceAPI.supervisorCheck(id, this.formData.value).subscribe(res=>{

          console.log("this is the supervisor approving", this.formData.value)
          this._snackBar.open("Approved Successfully!", "X", {
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
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })

      }
      })
    }
  }
  onReject(id: any){
    if (window.confirm('Are you sure you want to Reject?')) {    if (window.confirm('Are you sure you want to approve?')) {
      this.formData = this.fb.group({
        is_Director_approved : ['false'],
        rejection_reason: ['NO sufficient data proovided']
      });
      this.clearenceAPI.hrCheck(id, this.formData.value).subscribe(res=>{
        this._snackBar.open("Requisition Successfully Updated!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.ngZone.run(() => this.router.navigateByUrl('administration/Resignation'));
      }, err=>{
        this.error = err;
        this._snackBar.open(this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }
}
}
