import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NssfConfigService } from 'src/app/Service/NssfConfigurations/nssf-config.service';

@Component({
  selector: 'app-update-nssf',
  templateUrl: './update-nssf.component.html',
  styleUrls: ['./update-nssf.component.scss']
})
export class UpdateNssfComponent implements OnInit {
  earningClass = [
    {
      id: 1,
      value: 'UEL',
      name: 'Upper Earning Limit(UEL)',
    },
    {
      id: 2,
      value: 'LEL',
      name: 'Lower Earnings Limit(LEL)',
    }
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  error: any;
  id: any;
  subscription!: Subscription;
  data: any;
  res: any;
  nssfid: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private nssfAPI: NssfConfigService,
    private activatedRoute: ActivatedRoute
  ) { }

  formData = this.fb.group({
    id: ['', Validators.required],
    tax_band: ['', Validators.required],
    earning_class: ['', Validators.required],
    employee_payment_rate: ['', Validators.required],
    min_earnings: ['', Validators.required],
    max_earnings: ['', Validators.required],
    company_payment_rate: ['', Validators.required],
    is_pensionable_earnings_specified: [''],
    pensionable_earnings: ['']
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.nssfid = param.id;
      console.log("Nssf Id", this.nssfid);
    });
    this.getNssfData(this.nssfid);
  }
  getNssfData(id: number) {
    this.nssfAPI.find(id).subscribe(
      (res) => {
        this.data = res;
        this.formData = this.fb.group({
          id: [this.nssfid],
          tax_band: [this.data.tax_band],
          earning_class: [this.data.earning_class],
          employee_payment_rate: [this.data.employee_payment_rate],
          min_earnings: [this.data.min_earnings],
          max_earnings: [this.data.max_earnings],
          company_payment_rate: [this.data.company_payment_rate],
          is_pensionable_earnings_specified: [this.data.is_pensionable_earnings_specified],
          pensionable_earnings: [this.data.pensionable_earnings]
        });

      },
      (err) => {
        this.error = err;
      }
    );
  }

  updateNSSFTax() {
    this.loading = true;
    if (this.formData.valid) {
      if (window.confirm('Are you sure you want to UPDATE NSSF?')) {
        if (this.formData.valid) {
          this.nssfAPI.update(this.nssfid, this.formData.value)
            .subscribe(
              (res) => {
                this.loading = false;
                this._snackBar.open("NSSF configurations UPDATED successfully.", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar', 'login-snackbar'],
                });
                this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nssf'));
              },
              (err) => {
                this.loading = false;
                this.error = err;
                this._snackBar.open("ERROR! Failed to UPDATE NSSF configurations!!", " TRY AGAIN!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              });

        } else {
          this.loading = false;
          this._snackBar.open("ERROR! Failed to UPDATE NSSF configurations!!", " TRY AGAIN!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nssf'));

      }
    } else if (!this.formData.valid) {
      this.loading = false;
      this._snackBar.open("Please provide a valid information to proceed!!", "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    }
  }
  // updateNSSFTax() {
  //   this.loading = true;
  //   console.log("NSSF Update Data", this.formData.value);
  //   this.nssfAPI.updateNssf(this.formData.value).subscribe(
  //     (res) => {
  //       this.loading = false;
  //       this._snackBar.open('NSSF configurations details updated successfully.', 'OK', {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         panelClass: ['mat-toolbar', 'green-snackbar'],
  //         duration: 2500,
  //       });
  //     },
  //     (err) => {
  //       this.loading = false;
  //       this.error = err;
  //       this._snackBar.open('Error, faild to update NSSF configuration!!', 'TRY AGAIN', {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         panelClass: ['mat-toolbar', 'red-snackbar'],
  //         duration: 2500,
  //       });
  //     }
  //   );
  // }

  // formInit(){
  //   const id = 1;
  //   this.nssfAPI.getNssfById(id).subscribe(data=>{
  //     this.res = data;
  //     this.formData = this.fb.group({
  //       tax_band: [this.res.tax_band],
  //       min_nssf: [this.res.min_nssf],
  //       max_nssf: [this.res.max_nssf],
  //       employee_payment_rate: [this.res.employee_payment_rate],
  //       company_payment_rate: [this.res.company_payment_rate],
  //     });

  //   })
  // }

  // submitData() {
  //   this.loading = true;
  // const id = 1;
  //  this.loading = true;
  //  if (window.confirm('Are you sure you want to add this tax?')) {
  //   if(this.formData.valid){
  //     this.nssfAPI.updateNssf(id, this.formData.value).subscribe(
  //       result => {
  //         this.loading = false;
  //           this._snackBar.open("NSSF Successfully Updated!", "X", {
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition,
  //             duration: 3000,
  //             panelClass: ['green-snackbar','login-snackbar'],
  //           });
  //             this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nssf'));
  //         },
  //         error => {
  //           this.loading = false;
  //             this.error = error;
  //               this._snackBar.open("Error due to " + this.error +"", "Try again!", {
  //                 horizontalPosition: this.horizontalPosition,
  //                 verticalPosition: this.verticalPosition,
  //                 duration: 3000,
  //                 panelClass: ['red-snackbar','login-snackbar'],
  //               });
  //         });
  //       }else{
  //         this.loading = false;
  //   this._snackBar.open("Invalid Form data", "Try again!", {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     duration: 3000,
  //     panelClass: ['red-snackbar','login-snackbar'],
  //   });
  //       }
  //     }
  // }

}
