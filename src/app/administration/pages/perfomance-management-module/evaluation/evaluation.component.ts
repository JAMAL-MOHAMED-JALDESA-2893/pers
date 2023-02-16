import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit, OnDestroy {

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
