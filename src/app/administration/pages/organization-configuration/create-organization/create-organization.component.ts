import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrganizationService } from 'src/app/Service/Performance/OrganizationService/organization.service';
import { banks } from '../../employees-management/create-employee/banks';
import { counties } from '../../employees-management/create-employee/counties';
import { countriesApiData } from '../../employees-management/create-employee/countriesApi';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit, OnDestroy {
  countriesData = countriesApiData;
  county: any;
  bank: any;
  branch: any;
  branch2: any;
  loading: boolean = false;
  subCountiesHome: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private organizationAPI: OrganizationService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getOrganization()
    this.fetchCounties();
    this.fetchbanks();
  }
  fetchCounties() {
    this.county = counties
  }
  onSelectedHome(event: any) {
    // this.subCounties = this.county.filter(e=> e.sub_counties == event.value)
    this.subCountiesHome = this.county.filter((e: { name: any; }) => e.name == event.value)[0].sub_counties;
  }

  fetchbanks() {
    this.bank = banks;
  }
  onSelectedBank(event: any) {
    this.branch = this.bank.filter((e: { name: any; }) => e.name == event.value)[0].branches;

  }
  onSelectedBank2(event: any) {
    this.branch2 = this.bank.filter((e: { name: any; }) => e.name == event.value)[0].branches;

  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
  getOrganization() {
    let id = 1;
    this.organizationAPI.getOrganization(id).subscribe(data => {
      this.ngZone.run(() => this.router.navigateByUrl('administration/configurations'));
    },
      error => {

      });
  }
  // information form
  ConfigurationsFormGroup = this._formBuilder.group({
    organization_name: ['', Validators.required],
    organization_street: ['', Validators.required],
    organization_building: ['', Validators.required],
    organization_floor: ['', Validators.required],
    organization_kra_pin: ['', Validators.required],
    organization_business_no: ['', Validators.required],
    organization_bank1_name: ['', Validators.required],
    organization_bank1_account: ['', Validators.required],
    organization_bank2_name: [''],
    organization_bank2_account: [''],
    organization_pay_bill: [''],
    organization_till: [''],
    organization_address: ['', Validators.required],
    organization_telephone: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(20)]],
    organization_email: ['', [Validators.required, Validators.email]],
    organization_location: [''],
    organization_county: ['', Validators.required],
    organization_country: ['', Validators.required],
    organization_website: ['', Validators.required],
    organization_map_link: [''],
  });

  onSubmit() {
    console.log("form data", this.ConfigurationsFormGroup.value)
    if (this.ConfigurationsFormGroup.valid) {
      this.organizationAPI.createOrganization(this.ConfigurationsFormGroup.value).pipe(first())
        .subscribe(result => {
          this._snackBar.open('Organization Saved Succefully!', 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('administration/configurations'));
        });

    } else {
      this._snackBar.open('Invalid Form data', 'Try again!', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }

  }

}
