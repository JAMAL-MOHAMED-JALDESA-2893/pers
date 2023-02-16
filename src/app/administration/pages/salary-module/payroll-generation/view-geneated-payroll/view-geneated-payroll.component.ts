import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { PayrollService } from 'src/app/Service/PayRoll/payroll.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
import { banks } from '../../../employees-management/create-employee/banks';
import { counties } from '../../../employees-management/create-employee/counties';
import { countriesApiData } from '../../../employees-management/create-employee/countriesApi';

@Component({
  selector: 'app-view-geneated-payroll',
  templateUrl: './view-geneated-payroll.component.html',
  styleUrls: ['./view-geneated-payroll.component.scss']
})
export class ViewGeneatedPayrollComponent implements OnInit {
  salary_id: number;
  countriesData = countriesApiData;
  county: any;
  bank: any;
  branch: any;
  data: any;
  loading: boolean = false;
  subCountiesHome: any;
  subCountiesCurrent: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private salaryAPI: SalaryService,
    private payrollService: PayrollService,
    private activatedRoute: ActivatedRoute,
  ) { }
  formData = this.fb.group({
    emp_no: ['', Validators.required],
    id_no: ['', Validators.required],
    first_name: ['', Validators.required],
    other_names: ['', Validators.required],
    bank: ['', Validators.required],
    bankbranchCode: ['', Validators.required],
    acct_no: ['', Validators.required],
    pin_no: ['', Validators.required],
    nssf_no: ['', Validators.required],
    nhif_no: ['', Validators.required],
    gross_pay: ['', Validators.required],
    net_salary: ['', Validators.required],
    total_relief: ['', Validators.required],
    nhif: ['', Validators.required],
    nssf: ['', Validators.required],
    helb: ['', Validators.required],
    total_non_cash_benefit: ['', Validators.required],
    value_of_quarters: ['', Validators.required],
    owner_occupied_interests: ['', Validators.required],
    personal_relief: ['2400', Validators.required],
    insurance_relief: ['', Validators.required],
    dcrs_actual_e2: ['', Validators.required],
  }
  );

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.salary_id = param.id;
    });
    this.fetchCounties();
    this.fetchbanks();
    this.getPayRollDetails(this.salary_id);
  }
  fetchCounties() {
    this.county = counties
  }
  onSelectedHome(event: any) {
    // this.subCounties = this.county.filter(e=> e.sub_counties == event.value)
    this.subCountiesHome = this.county.filter((e: { name: any; }) => e.name == event.value)[0].sub_counties;
  }
  onSelectedCurrent(event: any) {
    this.subCountiesCurrent = this.county.filter((e: { name: any; }) => e.name == event.value)[0].sub_counties;
  }
  fetchbanks() {
    this.bank = banks;
  }
  onSelectedBank(event: any) {
    this.branch = this.bank.filter((e: { name: any; }) => e.name == event.value)[0].branches;
  }
  onPayRollApproval(id: any) {
    if (window.confirm('Are you sure you want to commmit the salary for this employee? this process can not be reverted')) {
      this.payrollService.commitEmployeeSalary(this.salary_id).subscribe(res => {
        this._snackBar.open("Commited the salary Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      })
    }
  }
  onPayRollUpdate() {
    console.log("Upadte Values", this.formData.value);
    
  }
  getPayRollDetails(id: any) {
    this.payrollService.find(id).subscribe(
      (res) => {
        this.data = res;

        this.formData = this.fb.group({
          emp_no: [this.data.emp_no],
          id_no: [this.data.id_no],
          first_name: [this.data.first_name],
          other_names:[this.data.other_names],
          bank: [this.data.bank],
          bankbranchCode: [this.data.bankbranchCode],
          acct_no: [this.data.acct_no],
          pin_no: [this.data.pin_no],
          nssf_no: [this.data.nssf_no],
          nhif_no: [this.data.nhif_no],
          gross_pay: [this.data.gross_pay],
          net_salary: [this.data.net_salary],
          total_relief: [this.data.total_relief],
          nhif: [this.data.nhif],
          nssf: [this.data.nssf],
          helb: [this.data.helb],
          total_non_cash_benefit: [this.data.total_non_cash_benefit],
          value_of_quarters: [this.data.value_of_quarters],
          owner_occupied_interests: [this.data.owner_occupied_interests],
          personal_relief: [this.data.personal_relief],
          insurance_relief: [this.data.insurance_relief],
          dcrs_actual_e2: [this.data.dcrs_actual_e2],
        })
      },
      (err) => { }
    );
  }

}
