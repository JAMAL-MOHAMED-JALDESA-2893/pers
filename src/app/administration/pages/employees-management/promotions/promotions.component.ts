import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { PromotionService } from 'src/app/Service/PromotionService/promotion.service';

export interface ApiData {
  id: String;
  firstName: String;
  middleName: String;
  lastName: String;
  prevPosition: String;
  prevBasicPay: String;
  newPosition: String;
  newBasicPay: String;
  promotedAt: String;
}
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['index', 'firstName', 'middleName', 'lastName', 'prevPosition', 'prevBasicPay', 'newPosition', 'newBasicPay', 'promotedAt', 'action'];
  dataSource!: MatTableDataSource<ApiData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData: any;
  promotionStatusArray: any = [
    'Active', 'Trashed',
  ]
  promotion_status = "Active"
  params: any;
  promotionData: any;
row: any;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private promotionsAPI: PromotionService,
  ) { }
  ngOnInit() {
    this.getData(this.promotion_status);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  // getData() {
  //   this.subscription = this.promotionsAPI.getPromotions().subscribe(res => {
  //    this.data = res;
  //    console.log("employee promotion data", res)
  //     // Binding with the datasource getPromotionsPerStatus(params:any)
  //     this.dataSource = new MatTableDataSource(this.data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }  
  getData(promotion_status: any) {
    this.promotion_status = promotion_status
    this.params = new HttpParams()
      .set('status', promotion_status);
    this.subscription = this.promotionsAPI.getPromotionsPerStatus(this.params).subscribe(res => {
      this.promotionData = res;
      // this.employeeLeavesDataCount  = Object.keys(res).length;
      this.dataSource = new MatTableDataSource(this.promotionData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onTrash(id: any) {
    if (window.confirm('Are you sure you want to put on trash?')) {
      this.promotionsAPI.trashPromotion(id).subscribe(res => {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          this._snackBar.open("Disabled Successfully Created!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        });
      }, err => {
        this.error = err
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      })
    }
  }
  onDelete(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.promotionsAPI.deletePromotion(id).subscribe(res => {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          this._snackBar.open("Disabled Successfully Created!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        });

      }, err => {
        this.error = err
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      })
    }
  }

  promoteEmployee(id: any) {
    this.router.navigate([`/administration/employee/promote/${id}`]);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


