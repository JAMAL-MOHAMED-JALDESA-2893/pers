import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

const middleName = "";

@Component({
  selector: 'app-your-payroll',
  templateUrl: './your-payroll.component.html',
  styleUrls: ['./your-payroll.component.scss']
})
export class YourPayrollComponent  implements OnInit, OnDestroy {
  
  displayedColumns: string[] =  ['gross_pay', 'paye', 'nssf', 'nhif', 'helb', 'net_pay', 'month', 'year', 'created_on', 'payslip'];

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  employeeSalary: any;
  e: any;
  middleName: string | undefined;
  employeeFirstName: any;
  employeeMiddleName: any;
  employeeLastName: any;
  loading = false;


  constructor(
    private employeeAPI: EmployeeService,
    private actRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private reportAPI: ReportService,
    ) { }


  ngOnInit() {

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  // getData() {

  //   // const userId = this.tokenStorage.getUser().employee_id;
  //   const userId = this.tokenStorage.getUser().employee_id;
  //   // this.propertyEnd.getPropertyId(getId).subscribe(data => {
  //   this.employeeAPI.getEmployeeId(userId).subscribe(data => {
  //     console.log("Your data", data);
  //     this.employeeData = data;
  //     this.employeeFirstName = data.firstName;
  //     this.employeeMiddleName = data.middleName;
  //     this.employeeLastName = data.lastName;
  //     this.employeeSalary = data.employeeSalary;
  //
  //   })
  // }

  getData() {

    const employeeId = this.tokenStorage.getUser().employeeDetails.id;

    // this.propertyEnd.getPropertyId(getId).subscribe(data => {

    this.employeeAPI.getEmployeeId(employeeId).subscribe(data => {
      this.employeeFirstName = data.firstName;
      this.employeeMiddleName = data.middleName;
      this.employeeLastName = data.lastName;
      this.employeeSalary = data.employeePayroll;

      console.log("Responded data", data);
    })
  }
  // g

  generatePayslip(id: any) {

    this.loading = true;
    this.reportAPI.generatePayslip(id).subscribe(response => {
      console.log(response);
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', '_blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    this.loading = false;
    }, error => {
      console.log(error);
    this.loading = false;
    });}
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
