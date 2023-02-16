import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { KraConfigService } from 'src/app/Service/KraConfigurations/kra-config.service';

const middleName = "";

@Component({
  selector: 'app-kra-configurations',
  templateUrl: './kra-configurations.component.html',
  styleUrls: ['./kra-configurations.component.scss']
})
export class KraConfigurationsComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
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
  loading: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private kraAPI: KraConfigService,
    private router: Router,
    private ngZone: NgZone,
    ) { }




  ngOnInit() {
    this.getNhifData();
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

  getNhifData() {
    this.loading = true;
    this.kraAPI.getKra().subscribe(res=>{
      this.data = res;
      this.loading = false;
    })

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onDelete(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.kraAPI.deleteKra(id).subscribe(res => {
        // call to destro an instance
        this._snackBar.open("Successful!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        let currentUrl = this.router.url;
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }, err => {
        this.error = err.error;
        this._snackBar.open(this.error, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}
