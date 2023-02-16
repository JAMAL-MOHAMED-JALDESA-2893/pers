import { HttpClient} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BatchService } from 'src/app/Service/BatchService/batch.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { UpdateBatchComponent } from './update-batch/update-batch.component';

@Component({
  selector: 'app-batch-processes',
  templateUrl: './batch-processes.component.html',
  styleUrls: ['./batch-processes.component.scss']
})
export class BatchProcessesComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subcription!: Subscription;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  e: any;
  error: any;
  batchData: any;
  subscription!:Subscription;

  constructor(
    private departmentAPI: DepartmentService,
    private batchAPI: BatchService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private router: Router,
    ) {}
  ngOnInit() {
    this.getBatchData();
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
  addBatchProcessDialog() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(AddBatchComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateBatchProcessDialog(id: any) {
    const dialogRef = this.dialog.open(UpdateBatchComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getBatchData(){
    this.subcription = this.batchAPI.getBatchprocesss().subscribe(res=>{
      this.batchData = res;
      console.log("Hello",  this.batchData)
    })
  }

  onEnabled(id: any){
    this.subscription = this.batchAPI.onEnabledLeaveType(id).subscribe(res=>{
      this._snackBar.open("Enabled Successfully!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }, err=>{
      this.error = err
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
  }
  onDisabled(id: any){
    this.subscription = this.batchAPI.onDisabledLeaveType(id).subscribe(res=>{
      this._snackBar.open("Disabled Successfully!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }, err=>{
      this.error = err
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
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
