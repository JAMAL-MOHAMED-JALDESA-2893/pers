import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { environment } from 'src/environments/environment';
const middleName = "";
@Component({
  selector: 'app-perfomance-parameters',
  templateUrl: './perfomance-parameters.component.html',
  styleUrls: ['./perfomance-parameters.component.scss']
})
export class PerfomanceParametersComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  formData: any;
  employee_id: any;
  employeeEmail: any;
  error: any;
  subscription!: Subscription
  data: any;

  constructor(
    private employeeAPI: EmployeeService,
    private parameterAPI: ParametersService,

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


  ngOnDestroy(){
    this.subscription.unsubscribe();
    // this.dtTrigger.unsubscribe();

  }

  getData() {
    this.subscription = this.parameterAPI.getParameters().subscribe(res => {
      this.data = res;

    })
  }
  onDelete(id: any){

  }
}
