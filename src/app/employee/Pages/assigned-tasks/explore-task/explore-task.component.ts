import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { DocumentService } from 'src/app/Service/DocumentsService/document.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { TaskService } from 'src/app/Service/Performance/TaskService/task.service';
import { environment } from 'src/environments/environment';
const middleName = "";
@Component({
  selector: 'app-explore-task',
  templateUrl: './explore-task.component.html',
  styleUrls: ['./explore-task.component.scss']
})
export class ExploreTaskComponent implements OnInit, OnDestroy {
 
  subscription!: Subscription;

  dtTrigger: Subject<any> = new Subject<any>();
  title = 'Departments Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  data: any;
  currentUser: any;
  employee_id: any;
  project_name: any;
  project_participation: any;
  component_name: any;
  progress: any;
  started_on: any;
  deadline: any;
  delivered_on: any;
  updated_at: any;
  results: any;
  filename: any;
  constructor(
    private tasksAPI: TaskService,
    private actRoute: ActivatedRoute,
    private fileService: DocumentService,
    ) {}
  ngOnInit() {
    this.getData();
    this.getFile();
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
  const id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.tasksAPI.getTaskId(id).subscribe(res => {
      this.data = res;
      this.project_name = this.data.project_name;
      this.project_participation = this.data.project_participation;
      this.component_name = this.data.component_name;
      this.progress = this.data.progress;
      this.started_on = this.data.started_on;
      this.deadline = this.data.deadline;
      this.delivered_on = this.data.delivered_on;
      this.updated_at = this.data.updated_at;
    })
  }
  getFile(){
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.employee_id = this.currentUser.id;
  this.subscription = this.fileService.getFilesByUserId(this.employee_id).subscribe( res =>{
    this.results = res;
    console.log("Hey respond",  this.filename);
  })

  }

}

