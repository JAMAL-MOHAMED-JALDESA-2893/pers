import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NssfConfigService } from 'src/app/Service/NssfConfigurations/nssf-config.service';

@Component({
  selector: 'app-add-nssf',
  templateUrl: './add-nssf.component.html',
  styleUrls: ['./add-nssf.component.scss']
})
export class AddNssfComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  error: any;
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
  showPensionableEarnings: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private nssfAPI: NssfConfigService
  ) { }

  ngOnInit(): void {
  }
  showOptions(event: MatCheckboxChange): void {
    console.log(event.checked);
    if (event.checked) {
      this.showPensionableEarnings = true;
    } else if (!event.checked) {
      this.showPensionableEarnings = false;
    }
  }
  formData = this.fb.group({
    tax_band: ['', Validators.required],
    earning_class: ['', Validators.required],
    employee_payment_rate: ['', Validators.required],
    min_earnings: ['', Validators.required],
    max_earnings: ['', Validators.required],
    company_payment_rate: ['', Validators.required],
    is_pensionable_earnings_specified: [''],
    pensionable_earnings: ['']
  });

  formInit() {
    this.formData = this.fb.group({
      tax_band: [''],
      earning_class: [''],
      employee_payment_rate: [''],
      min_earnings: [''],
      max_earnings: [''],
      company_payment_rate: [''],
      is_pensionable_earnings_specified: [''],
      pensionable_earnings: ['']
    });
  }


  addNSSFTax() {
    this.loading = true;
    console.log("Hey it works", this.formData.value)
    this.loading = true;
    if (window.confirm('Are you sure you want to add this tax?')) {
      if (this.formData.valid) {
        this.nssfAPI.createNssf(this.formData.value).subscribe(
          result => {
            this.loading = false;
            this._snackBar.open("NSSF Successfully Created!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('administration/configurations/nssf'));
          },
          error => {
            this.loading = false;
            this.error = error;
            this._snackBar.open("Error due to " + this.error + "", "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          });
      } else {
        this.loading = false;
        this._snackBar.open("Invalid Form data", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      }
    }


  }

}
