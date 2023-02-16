import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { PayrollService } from '../../../../../Service/PayRoll/payroll.service';

@Component({
  selector: 'app-create-cust-payroll',
  templateUrl: './create-cust-payroll.component.html',
  styleUrls: ['./create-cust-payroll.component.scss']
})
export class CreateCustPayrollComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['index', 'emp_no', 'first_name', 'other_names', 'id_no', 'acct_no', 'bank', 'nssf_no', 'nhif_no', 'pin_no', 'period_m', 'period_y',
    'salary',
    'nssf',
    'nhif',
    'paye',
    'helb',
    'total_deductions_net_salary',
    'net_salary', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  error: any;
  loading = false;
  existingData = false;
  index: any;
  imgSignSrc: any;
  dataFromLocal: any;
  employeesArray: any;
  monthsArray: any = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  month = this.monthsArray[new Date().getMonth()]
  constructor(
    private departmentAPI: DepartmentService,
    private employeeAPI: EmployeeService,
    private salaryAPI: PayrollService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { this.getEmployees() }
  ngOnInit() {
    this.initForm();
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  getEmployees() {
    this.employeeAPI.getActiveEmployees().subscribe(res => {
      this.employeesArray = res;
    })
  }
  // allowance_customs: []
  // alternativeEmail: ""
  // alternativePhone: ""
  // bankAccount: "131213131212"
  // bankName: "KCB"
  // birthCertNo: "Not Provided"
  // cash_payment_amount: 0
  // cash_payment_means: "Cash"
  // cash_payment_reason: "Not Provided"
  // city: "LITEIN"
  // cleared_at: null
  // county: "BOMET"
  // courseProgram: "Bsc Computer Science"
  // created_at: null
  // dcrs_actual_e2: 0
  // deleted_at: "2022-07-21T22:12:23"
  // departmentId: 2
  // emp_no: 3
  // employeeEducation: [{…}]
  // employeePayroll: []
  // employeeWorkExperience: []
  // employee_status: "Active"
  // enrolled_on: null
  // enrollmentStatus: "Graduated"
  // firstName: "collins"
  // firstRefCompany: "chuka"
  // firstRefEmail: "ff@gmail.com"
  // firstRefName: "henry"
  // firstRefPhone: "82830121"
  // gender: "Male"
  // gross_salary: 222222
  // has_dummy_salary: false
  // have_account: false
  // highestEducation: "Bachelors"
  // homeAddress: "Not Provided"
  // homeNumber: "726634786"
  // id: 1
  // insurance_relief: 0
  // is_activated: false
  // is_approved: true
  // is_deleted: false
  // is_evaluation_enrolled: false
  // is_sacco_enrolled: false
  // is_salary_closed: true
  // is_trashed: false
  // jobGroup: "Lead Position"
  // kraNo: "A010183967R"
  // lastName: "kibet"
  // middleName: ""
  // nationalId: "34519878"
  // nationality: "KENYAN"
  // nhifNo: "23242"
  // nssfNo: "23232"
  // occupation: "Full Stack Software Developer"
  // other_names: ""
  // owner_occupied_interests: 0
  // permanently_cleared: false
  // personalEmail: "coullence@gmail.com"
  // personalPhone: "726634786"
  // personal_relief: 2400
  // pm_goals: []
  // position: "Entry-level"
  // postalAddress: "48"
  // postalCode: "20210"
  // promoted_at: null
  // promotions: []
  // religion: "Christian"
  // reportingTo: "Human Resource Manager"
  // requested_resignation: false
  // residentialCountry: "KENYA"
  // residentialCounty: "NAIROBI"
  // residentialSubCounty: "ROYSAMBU"
  // sacco_contributions: [{…}]
  // sacco_deduction_percentage: 0
  // salary_status: "Opened"
  // secondRefCompany: "223232"
  // secondRefEmail: "sdsds@gmail.com"
  // secondRefName: "2323232"
  // secondRefPhone: "2323232322"
  // specialNeedDescription: "Without Special Need Attention"
  // specialNeeds: "No"
  // specialNeedsCertificate: "Without Special Need Attention"
  // subCounty: "KONOIN"
  // timeTaken: "Not Provided"
  // total_non_cash_benefit: 0
  // updated_at: "2022-07-21T22:12:36"
  // value_of_quarters: 0
  // workMail: "ckibet@emtechhouse.co.ke"

  onSelectEmployee(e: any) {
    this.formData = this.fb.group({
      emp_no: [e.value.emp_no],
      first_name: [e.value.firstName],
      other_names: [e.value.middleName + e.value.lastName],
      id_no: [e.value.nationalId],
      acct_no: [e.value.bankAccount],
      bank: [e.value.bankName],
      nssf_no: [e.value.nssfNo],
      nhif_no: [e.value.nhifNo],
      pin_no: [e.value.kraNo],
      period_m: [this.month],
      period_y: [new Date().getFullYear()],
      salary: [e.value.gross_salary],
      nssf: [],
      nhif: [[Validators.required]],
      paye: [[Validators.required]],
      helb: [],
      total_deductions_net_salary: [[Validators.required]],
      net_salary: [[Validators.required]],
    });
  }


  formData = this.fb.group({
    emp_no: [],
    first_name: [],
    other_names: [],
    id_no: [],
    acct_no: [],
    bank: [],
    nssf_no: [],
    nhif_no: [],
    pin_no: [],
    period_m: [],
    period_y: [],
    salary: [],
    nssf: [],
    nhif: [],
    paye: [],
    helb: [],
    total_deductions_net_salary: [],
    net_salary: []
  });
  initForm() {
    // this.formData = this.fb.group({
    //   emp_no: [''],
    //   first_name: [''],
    //   other_names: [''],
    //   id_no: [''],
    //   acct_no: [''],
    //   bank: [''],
    //   nssf_no: [''],
    //   nhif_no: [''],
    //   pin_no: [''],
    //   period_m: [''],
    //   period_y: [''],
    //   salary: [''],
    //   nssf:[''],
    //   nhif: [''],
    //   paye: [''],
    //   helb: [''],
    //   total_deductions_net_salary: [''],
    //   net_salary:[''],
    // });
  }
  // Get Employee Detail
  employeeLookup() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  dataArray = new Array();
  onInitArray() {
    this.dataArray = new Array();
  }
  getDataOnInit() {
    this.dataArray = JSON.parse(localStorage.getItem('Salary_Details') || '{}');
    this.dataSource = new MatTableDataSource(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onDelete(i: any) {
    this.dataArray.splice(i, 1);
    this.dataArray = this.dataArray;
    window.localStorage.removeItem("Salary_Details");
    window.localStorage.setItem("Salary_Details", JSON.stringify(this.dataArray));
    this._snackBar.open('Deleted', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  onEdit(i: any) {
    this.existingData = true;
    this.index = i
    this.formData = this.fb.group({
      emp_no: [this.dataArray[i].emp_no],
      first_name: [this.dataArray[i].first_name],
      other_names: [this.dataArray[i].other_names],
      id_no: [this.dataArray[i].id_no],
      acct_no: [this.dataArray[i].acct_no],
      bank: [this.dataArray[i].bank],
      nssf_no: [this.dataArray[i].nssf_no],
      nhif_no: [this.dataArray[i].nhif_no],
      pin_no: [this.dataArray[i].pin_no],
      period_m: [this.dataArray[i].period_m],
      period_y: [this.dataArray[i].period_y],
      salary: [this.dataArray[i].salary],
      nssf: [this.dataArray[i].nssf],
      nhif: [this.dataArray[i].nhif],
      paye: [this.dataArray[i].paye],
      helb: [this.dataArray[i].helb],
      total_deductions_net_salary: [this.dataArray[i].total_deductions_net_salary],
      net_salary: [this.dataArray[i].net_salary],
    });
  }
  onUpdate(i: any) {
    if (this.formData.valid) {
      this.dataArray[i] = this.formData.value
      window.localStorage.removeItem("Salary_Details");
      window.localStorage.setItem("Salary_Details", JSON.stringify(this.dataArray));
      this._snackBar.open('Updated', 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }
  getData() {
    this.departmentAPI.getDepartments().subscribe(res => {
      this.data = this.dataArray;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  onAdd() {
    if (this.formData.valid) {
      this.salaryAPI.createManualpayroll(this.formData.value).subscribe(res => {
        // on successfulll submission, clear the array and local storage
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        this.initForm();
        this.router.navigateByUrl('administration/pending/salary');
      }, err => {
        this.error = err;
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });

      })
    }
  }

}
