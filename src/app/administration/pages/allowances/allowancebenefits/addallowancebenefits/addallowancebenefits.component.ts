import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { CustomBenefitsService } from 'src/app/Service/CustomBenefits/custom-benefits.service';

@Component({
  selector: 'app-addallowancebenefits',
  templateUrl: './addallowancebenefits.component.html',
  styleUrls: ['./addallowancebenefits.component.scss']
})
export class AddallowancebenefitsComponent implements OnInit {
  loading: boolean = false;
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
    private allowanceBenefitsAPI: CustomBenefitsService) { }
  benefitsForm = this.fb.group({
    employee_id: ['', Validators.required],
    monthly_valuation: ['', Validators.required],
    benefit_for: ['', Validators.required],
    is_taxable: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.employeeAPI.getActiveEmployees().subscribe(res => {
      this.employeesData = res;
    }, err => {
      this.error = err;
    })
  }

  submitData() {
    this.loading = true;
    if (this.benefitsForm.valid) {
      if (window.confirm('Are you sure you want to ADD this allowance Benefit?')) {
        if (this.benefitsForm.valid) {
          this.allowanceBenefitsAPI.create(this.benefitsForm.value)
            .subscribe(
              result => {
                this.loading = false;
                this._snackBar.open("Custom Allowance Benefits added successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
              },
              error => {
                this.loading = false;
                this._snackBar.open("ERROR! Failed to add custom allowance benefits!!", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to add custom allowance benefits!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
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

}
