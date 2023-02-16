import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayrollService } from '../../../../../Service/PayRoll/payroll.service';
@Component({
  selector: 'app-update-cust-payroll',
  templateUrl: './update-cust-payroll.component.html',
  styleUrls: ['./update-cust-payroll.component.scss']
})
export class UpdateCustPayrollComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['index','emp_no','first_name','other_names','id_no','acct_no','bank','nssf_no','nhif_no','pin_no','period_m','period_y',
  'salary',
  'nssf',
  'nhif',
  'paye',
  'helb',
  'total_deductions_net_salary',
  'net_salary','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  loading = false;
  existingData = false;
  index: any;
  imgSignSrc: any;
  dataFromLocal: any;
  constructor(
    private payrollAPI: PayrollService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }
    ngOnInit() {
      this.getData();
    }
    formData = this.fb.group({
      id:['',[Validators.required]],
      emp_no: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      other_names: ['',[Validators.required]],
      id_no: ['',[Validators.required]],
      acct_no: ['',[Validators.required]],
      bank: ['',[Validators.required]],
      nssf_no: ['',[Validators.required]],
      nhif_no: ['',[Validators.required]],
      pin_no: ['',[Validators.required]],
      period_m: ['',[Validators.required]],
      period_y: ['',[Validators.required]],
      salary: ['',[Validators.required]],
      nssf: ['',[Validators.required]],
      nhif: ['',[Validators.required]],
      paye: ['',[Validators.required]],
      helb: ['',[Validators.required]],
      total_deductions_net_salary: ['',[Validators.required]],
      net_salary:['',[Validators.required]],
    });
    initForm(){
      this.formData = this.fb.group({
        id:[''],
        emp_no: [''],
        first_name: [''],
        other_names: [''],
        id_no: [''],
        acct_no: [''],
        bank: [''],
        nssf_no: [''],
        nhif_no: [''],
        pin_no: [''],
        period_m: [''],
        period_y: [''],
        salary: [''],
        nssf:[''],
        nhif: [''],
        paye: [''],
        helb: [''],
        total_deductions_net_salary: [''],
        net_salary:[''],
      });
    }
  getData() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription =  this.payrollAPI.find(id).subscribe(res => {
      this.data = res;
        this.formData = this.fb.group({
          id:[this.data.id],
          emp_no: [this.data.emp_no],
          first_name: [this.data.first_name],
          other_names: [this.data.other_names],
          id_no: [this.data.id_no],
          acct_no: [this.data.acct_no],
          bank: [this.data.bank],
          nssf_no: [this.data.nssf_no],
          nhif_no: [this.data.nhif_no],
          pin_no: [this.data.pin_no],
          period_m: [this.data.period_m],
          period_y: [this.data.period_y],
          salary: [this.data.salary],
          nssf: [this.data.nssf],
          nhif: [this.data.nhif],
          paye: [this.data.paye],
          helb: [this.data.helb],
          total_deductions_net_salary: [this.data.total_deductions_net_salary],
          net_salary:[this.data.net_salary],
        });
     })
   }
    onAdd() {
      if(this.formData.valid){
        this.subscription = this.payrollAPI.updatePayroll(this.formData.value).subscribe(res=>{
          // on successfulll submission, clear the array and local storage
          this._snackBar.open("Successful!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
          this.router.navigateByUrl('administration/pending/salary');
          window.localStorage.removeItem("Salary_Details");
        }, err=>{
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['red-snackbar','login-snackbar'],
                  });
        })
      }
    }
}
