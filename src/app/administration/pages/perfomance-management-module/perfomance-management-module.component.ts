import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { TaskService } from 'src/app/Service/Performance/TaskService/task.service';

@Component({
  selector: 'app-perfomance-management-module',
  templateUrl: './perfomance-management-module.component.html',
  styleUrls: ['./perfomance-management-module.component.scss']
})
export class PerfomanceManagementModuleComponent implements OnInit, OnDestroy {

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

  constructor(
    private employeeAPI: EmployeeService,

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
    this.subscription = this.employeeAPI.getActiveEmployees().subscribe(data => {
      this.employeeData = data;
    })
  }
}
