import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { TaskService } from 'src/app/Service/Performance/TaskService/task.service';
import { environment } from 'src/environments/environment';
const middleName = "";

@Component({
  selector: 'app-assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.scss']
})
export class AssignedTasksComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  dtTrigger: Subject<any> = new Subject<any>();
  title = 'Departments Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  data: any;
  currentUser: any;
  employee_id: any;
  constructor(
    private tasksAPI: TaskService,
    private actRoute: ActivatedRoute,
    ) {}
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

  }
  getData() {
  this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  this.employee_id = this.currentUser.id;
    this.subscription = this.tasksAPI.getTaskByEmployeeId(this.employee_id).subscribe(res => {
      this.data = res;

    })
  }

}
