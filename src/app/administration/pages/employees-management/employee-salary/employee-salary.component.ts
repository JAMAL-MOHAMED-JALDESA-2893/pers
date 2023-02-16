import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';

const middleName = "";

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent  implements OnInit, OnDestroy {

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


  getData() {

    const id = this.actRoute.snapshot.paramMap.get('id');

    // this.propertyEnd.getPropertyId(getId).subscribe(data => {

    this.employeeAPI.getEmployeeId(id).subscribe(data => {
      this.employeeFirstName = data.firstName;
      this.employeeMiddleName = data.middleName;
      this.employeeLastName = data.lastName;
      this.employeeSalary = data.employeeSalary;
    })
  }
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

    genExcel() {

      this.loading = true;

      this.reportAPI. getExcel().subscribe(response => {
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
