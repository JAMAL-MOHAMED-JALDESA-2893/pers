import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NssfConfigService } from 'src/app/Service/NssfConfigurations/nssf-config.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { UpdateNssfComponent } from './update-nssf/update-nssf.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nssf-configurations',
  templateUrl: './nssf-configurations.component.html',
  styleUrls: ['./nssf-configurations.component.scss']
})
export class NssfConfigurationsComponent implements OnInit {

  displayedColumns: string[] = [
    'index',
    'tax_band',
    'earning_class',
    'min_earnings',
    'max_earnings',
    'employee_payment_rate',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading: boolean = false;
  dialogConfig: any;

  error: any;
  data: any;

  constructor(
    private router: Router,
    private departmentAPI: DepartmentService,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private nssfAPI: NssfConfigService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getNssfData();
    //this.getNssf();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'csv', 'excel', 'print', 'pdf',
    //   ]
    // }
  }
  getNssfData() {
    this.loading = true;
    this.nssfAPI.getNssf().subscribe(
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

  // getNssf(){
  //   let id = 1;
  //   this.nssfAPI.getNssfById(id).subscribe( data =>{
  //       this.showUpdateButton = true;
  //       this.showCreateButton =  false;
  //       this.id = data.id;
  //       this.tax_band = data.tax_band;
  //       this.min_nssf = data.min_nssf;
  //       this.max_nssf = data.max_nssf;
  //       this.nssf_deduction = data.nssf_deduction;
  //       this.employee_payment_rate = data.employee_payment_rate;
  //       this.company_payment_rate = data.company_payment_rate;
  //       this.total_nssf_rate = data.total_nssf_rate;
  //       this.status = data.status;
  //       this.deleted = data.deleted;
  //       this.created_at = data.created_at;
  //       this.updated_at = data.updated_at;
  //       this.deleted_at = data.deleted_at;
  //   },
  //   error => {
  //     this.showCreateButton =  true;
  //     this.showUpdateButton = false;
  //     this.error = error;
  //     console.log("Clientside", this.error);
  // });

  // }

  // editNSSF(row: any) {
  //   this.dialogConfig = new MatDialogConfig();
  //   this.dialogConfig.disableClose = false;
  //   this.dialogConfig.autoFocus = true;
  //   this.dialogConfig.width = "40%";
  //   this.dialogConfig.data = row;
  //  const dialogRef=  this.dialog.open(UpdateNssfComponent, this.dialogConfig);
  //   dialogRef.afterClosed().subscribe(res => {
  //     this.getNssfData();
  //   }) 
  // }
  updateNSSF(id: any) {
    this.router.navigate([`/administration/configurations/nssf/update/${id}`])
  }
  deleteNSSF(id: number) {
    if (window.confirm('Are You Sure to DELETE?')) {
      this.loading = true;
      this.nssfAPI.deleteNssf(id).subscribe(
        (res) => {
          this.loading = false;
          this.getNssfData();
          this._snackBar.open("NSSF Configuration DELETED Successfully", "OK", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'green-snackbar'],
            duration: 2500,
          });
        },
        (err) => {
          this.loading = false;
          this.error = err;
          this._snackBar.open("ERROR!!,Failed to DELETE NSSF COnfiguration!!", "TRY AGAIN", {
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
