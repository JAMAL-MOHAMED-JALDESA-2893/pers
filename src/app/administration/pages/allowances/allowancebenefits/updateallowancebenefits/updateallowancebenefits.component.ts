import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { CustomBenefitsService } from 'src/app/Service/CustomBenefits/custom-benefits.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

@Component({
  selector: 'app-updateallowancebenefits',
  templateUrl: './updateallowancebenefits.component.html',
  styleUrls: ['./updateallowancebenefits.component.scss']
})
export class UpdateallowancebenefitsComponent implements OnInit {
  data: any;
  params: any;
  loading: boolean = false;
  benefitsData: any;
  benefitId: number; 
  employeesData: any;
  error: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private allowanceBenefitsAPI: CustomBenefitsService) { }

  benefitsForm = this.fb.group({
    id:['', Validators.required],
    employee_id: ['', Validators.required],
    monthly_valuation: ['', Validators.required],
    benefit_for: ['', Validators.required],
    is_taxable: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required]
  })
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.benefitId = param.id;
    });
    this.getAllowanceBenefitData(this.benefitId);
    this.getEmployees();
    //this.onInitForm();
  }
  getEmployees() {
    this.employeeAPI.getActiveEmployees().subscribe(res => {
      this.employeesData = res;
    }, err => {
      this.error = err;
    })
  }
  // submitBenefits() {
  //   console.log("Update values", this.benefitsForm.value);
  //   this.allowanceBenefitsAPI.updateBenefits(this.benefitId ,this.benefitsForm.value).subscribe(
  //     (res) => {
  //       this.data = res;
  //       console.log("API response", this.data);
  //     }
  //   )
  // }
  submitBenefits() {
    this.loading = true;
    if (this.benefitsForm.valid) {
      if (window.confirm('Are you sure you want to UPDATE this Benefits?')) {
        if (this.benefitsForm.valid) {
          this.allowanceBenefitsAPI.updateBenefits(this.benefitId, this.benefitsForm.value)
            .subscribe(
              result => {
                this.loading = false;
                this._snackBar.open("Custom Allowance Benefits UPDATED successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
              },
              error => {
                this.loading = false;
                this._snackBar.open("ERROR! Failed to UPDATE custom allowance benefits!!", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to UPDATE custom allowance benefits!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
        
      }
    } else if (!this.benefitsForm.valid) {
      this.loading = false;
      this._snackBar.open("Please provide a valid information to proceed!!", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    }
  }
  getAllowanceBenefitData(id: number) {
    this.allowanceBenefitsAPI.find(id).subscribe(
      (res) => {
        this.benefitsData = res;
        this.benefitsForm = this.fb.group({
          id:[this.benefitsData.id],
          employee_id: [this.benefitsData.employee_id],
          monthly_valuation: [this.benefitsData.monthly_valuation],
          benefit_for: [this.benefitsData.benefit_for],
          is_taxable: [this.benefitsData.is_taxable],
          start_date: [this.benefitsData.start_date],
          end_date: [this.benefitsData.end_date]
        })
      },
      (err) => { }
    );
  }

}
