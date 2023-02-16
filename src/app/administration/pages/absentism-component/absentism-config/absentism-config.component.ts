import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AbsentismconfigconfigService } from 'src/app/Service/AbsentismConfig/absentismconfig.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';
import { AddAbsentismComponent } from './add-absentism/add-absentism.component';
import { UpdateAbsentismComponent } from './update-absentism/update-absentism.component';
const middleName = "";

@Component({
  selector: 'app-absentism-config',
  templateUrl: './absentism-config.component.html',
  styleUrls: ['./absentism-config.component.scss']
})
export class AbsentismConfigComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Departments Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  departmentData: any;
  e: any;
  error: any;
  data: any;
 
  constructor(
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private absentismconfigAPI: AbsentismconfigconfigService,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
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
    this.subscription = this.absentismconfigAPI.getAbsentismconfigs().subscribe(res=>{
      this.data = res;
      console.log(res);
      
    }, err=>{})
  }
  setConfigurationDialog() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(AddAbsentismComponent ,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateConfigurationDialog(id: any) {
    const dialogRef = this.dialog.open(UpdateAbsentismComponent ,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.ngOnDestroy();
      this.departmentAPI.deleteDepartment(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Department Successfully Deleted!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err.error;
        this._snackBar.open("Error: You can not delete a department which has got employees!", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }

}
function ddAbsentismComponent(ddAbsentismComponent: any, arg1: { data: { id: string | null; }; }) {
  throw new Error('Function not implemented.');
}

