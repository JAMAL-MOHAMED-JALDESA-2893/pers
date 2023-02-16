import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { GoalService } from 'src/app/Service/Performance/GoalService/goal.service';
import { SetreviewComponent } from './review/setreview/setreview.component';
import { SetgoalComponent } from './setgoal/setgoal.component';
import { UpdategoalComponent } from './updategoal/updategoal.component';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements  OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  subscription!:Subscription;
  error: any;
  data: any;
 true = true;
 false = false;

  constructor(
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private goalsAPI: GoalService,
    private actRoute: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
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
    this.subscription.unsubscribe();
  }
  setGoalDialog() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(SetgoalComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateGoalDialog(id:any) {
    const dialogRef = this.dialog.open(UpdategoalComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCommentDialog(id: any) {
    const dialogRef = this.dialog.open(SetreviewComponent,{
      data: {id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getData(){
    const employee_id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.goalsAPI.getGoalsByEmployeeId(employee_id).subscribe( res=>{
      this.data = res;
      console.log("data respondned",res)
      for(let result of this.data){
        status = result.review_enabled
        if(status == 'true'){
          console.log("hey printing now",result.review_enabled)
        }
     }
    }, err=>{
      this.error = err;
    })

  }
  // onDelete(id: any) {
  //   if (window.confirm('Are you sure to delete?')) {
  //     this.ngOnDestroy();
  //     this.departmentAPI.deleteDepartment(id).subscribe(res => {
  //       // call to destro an instance
  //       this._snackBar.open("Department Successfully Deleted!", "X", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: 3000,
  //         panelClass: ['green-snackbar','login-snackbar'],
  //       });
  //       // call to reinitialize the table
  //       this.ngOnInit();
  //     }, err => {
  //       this.error = err.error;
  //       this._snackBar.open("Error: You can not delete a department which has got employees!", "Try again!", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: 3000,
  //         panelClass: ['red-snackbar','login-snackbar'],
  //       });
  //     })
  //   }
  // }

}
