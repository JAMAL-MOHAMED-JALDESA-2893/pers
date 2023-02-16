import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
export interface PeriodicElement {
  parameter_name: string;
  measurement_type: string;
}
@Component({
  selector: 'app-employee-assessment',
  templateUrl: './employee-assessment.component.html',
  styleUrls: ['./employee-assessment.component.scss']
})
export class EmployeeAssessmentComponent implements  OnInit, OnDestroy {
  selection = new SelectionModel<PeriodicElement>(true, []);


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

  call() {
    console.log(this.selection.selected);
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
