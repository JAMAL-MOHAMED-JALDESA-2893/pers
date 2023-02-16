import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NhifConfigService } from 'src/app/Service/NhifConfigurations/nhif-config.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const middleName = "";


@Component({
  selector: 'app-nhif-configurations',
  templateUrl: './nhif-configurations.component.html',
  styleUrls: ['./nhif-configurations.component.scss']
})
export class NhifConfigurationsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'tax_band',
    'min_threshold',
    'max_threshold',
    'nhif_deduction',
    'status',
    'updated_at',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading: boolean = false;;


  departmentData: any;
  e: any;
  error: any;
  employeeCountRes: any;
  getMonth: any;
  getYear: any;
  params: any;
  totalsData: any;
  payeDeductions: any;
  nhifDeductions: any;
  nssfDeductions: any;
  helbDeductions: any;
  grossPay: any;
  netPay: any;
  data: any;

  constructor(
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private nhifAPI: NhifConfigService,
  ) { }

  ngOnInit() {
    this.getNhifData();
  }
  getNhifData() {
    this.loading = true;
    this.nhifAPI.getNhif().subscribe(
      (res) => {
        this.data = res;
        this.loading = false;
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

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  deleteNHIF(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.ngOnDestroy();
      this.nhifAPI.deleteNhif(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
        // call to reinitialize the table
        this.ngOnInit();
      }, err => {
        this.error = err;
        this._snackBar.open(this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      })
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
