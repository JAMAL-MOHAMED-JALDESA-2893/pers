import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';

@Component({
  selector: 'app-update-basic-salary',
  templateUrl: './update-basic-salary.component.html',
  styleUrls: ['./update-basic-salary.component.scss']
})
export class UpdateBasicSalaryComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  rolesArray: any = [

    'ROLE_ADMIN',
    'ROLE_DIRECTOR',
    'ROLE_HR',
    'ROLE_SUPERVISOR',
    'ROLE_USER',
    'ROLE_MODERATOR'
    // 'ROLE_HR'
  ]

  error = '';
  loading = false;
  salaryData: any;
  params: any;
  requestData: any;
  requestParam: any;
  employeeData: any;
  reportingTo: any;
  minDate: Date;
  maxDate: Date;
  newBasic_salary: any;
  empID: any;
  empdata: any;


  constructor(
    private salaryAPI: SalaryService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }
  formData = this.fb.group({
    id: ['', Validators.required],
    newBasic_salary: ['', Validators.required],
  });

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.empID = param.id;
      console.log("Employee ID", this.empID);
    });
    this.getBasicSalaryData(this.empID);
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  // submitData() {
  //   this.loading = true;
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //    if (window.confirm('Are you sure you want to UPDATE basic salary for this employee?')) {
  //      if (this.formData.valid) {
  //        this.newBasic_salary = this.formData.controls.newBasic_salary.value;
  //       // const newBasic_salary = this.f.newBasic_salary.value;
  //        this.params = new HttpParams()
  //          .set('newBasic_salary', this.newBasic_salary);
  //        console.log("params", this.params);
       
  //       this.salaryAPI.updateBasicSalary(id, this.params).subscribe(res =>{
  //         this.loading = false;
  //         this._snackBar.open("Salary Successfully Updated!", "X", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: 3000,
  //           panelClass: ['green-snackbar','login-snackbar'],
  //         });

  //       this.ngZone.run(() => this.router.navigateByUrl('administration/pending/salary'));

  //       }, err=>{
  //         this.loading = false;
  //         this.error = err;
  //         this._snackBar.open("Invalid Form data or " + this.error, "Try again!", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: 3000,
  //           panelClass: ['red-snackbar','login-snackbar'],
  //         });

  //       });

    
  //   }

  //    }
  //   }
  
  submitData() {
    this.loading = true;
    if (this.formData.valid) {
      if (window.confirm('Are you sure you want to UPDATE this Benefits?')) {
        if (this.formData.valid) {
          this.salaryAPI.updateBasicSalary(this.empID, this.formData.value)
            .subscribe(
              result => {
                this.loading = false;
                this._snackBar.open("Employee basic salary UPDATED successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/pending/salary'));
              },
              error => {
                this.loading = false;
                this._snackBar.open("ERROR! Failed to UPDATE basic salary!!", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to UPDATE basic salary!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('administration/pending/salary'));
        
      }
    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Please provide a valid basic salary to proceed!!", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    }
  }

  getBasicSalaryData(id: number) {
    this.salaryAPI.find(id).subscribe(
      (res) => {
        this.empdata = res;
        this.formData = this.fb.group({
          id:[this.empdata.id],
          newBasic_salary: [this.empdata.newBasic_salary],
        })
      },
      (err) => { }
    );
  }
}


