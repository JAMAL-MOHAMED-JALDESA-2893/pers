import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AdvanceSalaryParamsService } from 'src/app/Service/AdvanceSalaryParams/advance-salary-params.service';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

export interface  ApiData {
  id:String;
  max_salary_percentage:String;
  min_salary_percentage:String;
  created_at:String;
  updated_at:String;
}

@Component({
  selector: 'app-advance-salary-params',
  templateUrl: './advance-salary-params.component.html',
  styleUrls: ['./advance-salary-params.component.scss']
})

export class AdvanceSalaryParamsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = [ 'index','max_salary_percentage','min_salary_percentage','created_at','updated_at'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData:any;
  showCreateButton =  true;
  showUpdateButton =  false;
  

  constructor(
    private advanceParamsAPI: AdvanceSalaryParamsService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    ) { }
    ngOnInit() {
      this.getData();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getData() {
    this.subscription = this.advanceParamsAPI.getAdvanceSalaryParams().subscribe(res=>{
       this.data = res;
       this.data = res;
       this.showUpdateButton = true;
       this.showCreateButton =  false;
       if(this.data == 0){
         this.showCreateButton =  true;
         this.showUpdateButton = false;
       }
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
}

