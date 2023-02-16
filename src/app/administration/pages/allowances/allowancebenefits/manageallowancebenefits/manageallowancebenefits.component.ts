import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomBenefitsService } from 'src/app/Service/CustomBenefits/custom-benefits.service';
import { RejectbenefitsDialogComponent } from '../rejectbenefits-dialog/rejectbenefits-dialog.component';
import { ReviewallowancebenefitsComponent } from '../reviewallowancebenefits/reviewallowancebenefits.component';


@Component({
  selector: 'app-manageallowancebenefits',
  templateUrl: './manageallowancebenefits.component.html',
  styleUrls: ['./manageallowancebenefits.component.scss']
})
export class ManageallowancebenefitsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'fullname',
    'departmentname',
    'monthly_valuation',
    'benefit_for',
    'startDate',
    'endDate',
    'is_director_approved',
    'created_at',
    'updated_at',
    'operation',
  ];
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = false;
  data: any;
  role: any;
  is_Director: boolean = false;
  allowance_closed: boolean = false;
  allowanceData: any;
  creatingAccount = false;
  showCreateButton = false;
  showUpdateButton = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error: any;
  dialogConfig: MatDialogConfig<any>;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private allowanceBenefitsAPI: CustomBenefitsService) { }

  ngOnInit(): void {
    this.Authorize();
  }
  Authorize() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[0];
    console.log("User BY role ", this.role);
    

    // First Level Authorization - Admin
    if (this.role == "ROLE_DIRECTOR") {
      this.is_Director = true;
    } else {
      this.is_Director = false;
    }
    this.getAllowanceBenefits();
  }
  getAllowanceBenefits() {
    this.loading = true;
    this.allowanceBenefitsAPI.read().subscribe(
      (res) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        
      },
      (err) => {
        this.loading = false;
        this.error = err;
      })
  }

  directorApprove(id: any) {
    if (window.confirm('Are you sure you want to APPROVE this Benefits?')) {
      this.allowanceBenefitsAPI.directorApprove(id)
        .subscribe(
          result => {
            this.loading = false;
            this.getAllowanceBenefits();
            this._snackBar.open("Custom Allowance Benefits APPROVED successfully.", "OK", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
           // this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
          },
          error => {
            this.loading = false;
            this._snackBar.open("ERROR! Failed to APPROVE custom allowance benefits!!", " TRY AGAIN!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          });
    } else {
      this.ngZone.run(() => this.router.navigateByUrl('administration/employee/allowance-benefits/view'));
    }
  }
  updateAllowanceBenefits(id: any) {
    this.router.navigate([`/administration/employee/allowance-benefits/update/${id}`]);
  }
  // manageApproval(id: any) {
  //   const dialogRef = this.dialog.open(ReviewallowancebenefitsComponent, {
  //     data: { id },
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  
  rejectDialog(row: any) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "30%";
    this.dialogConfig.data = row;
   const dialogRef=  this.dialog.open(RejectbenefitsDialogComponent, this.dialogConfig);
   dialogRef.afterClosed().subscribe(res => {
    this.getAllowanceBenefits();
    })
  }
  manageApproval(row: any) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "30%";
    this.dialogConfig.data = row;
   const dialogRef=  this.dialog.open(ReviewallowancebenefitsComponent, this.dialogConfig);
   dialogRef.afterClosed().subscribe(res => {
    this.getAllowanceBenefits();
    })
  }
 
  deleteAllowanceBenefits(id: number) {
    if (window.confirm('Are You Sure to DELETE?')) {
      this.loading = true;
      this.allowanceBenefitsAPI.delete(id).subscribe(
        (res) => {
          this.loading = false;
          this.getAllowanceBenefits();
          this._snackBar.open("Custom Allowance Benefits DELETED Successfully", "OK", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'green-snackbar'],
            duration: 2500,
          });
        },
        (err) => {
          this.loading = false;
          this.error = err;
          this._snackBar.open("ERROR!!,Failed to DELETE Custom Allowance Benefits !!", "TRY AGAIN", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'red-snackbar'],
            duration: 2500,
          });
        }
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
