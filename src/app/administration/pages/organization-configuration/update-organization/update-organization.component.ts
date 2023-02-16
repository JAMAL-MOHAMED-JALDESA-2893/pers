import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrganizationService } from 'src/app/Service/Performance/OrganizationService/organization.service';
import { banks } from '../../employees-management/create-employee/banks';
import { counties } from '../../employees-management/create-employee/counties';
import { countiesApiData } from '../../employees-management/create-employee/countiesApi';
import { countriesApiData } from '../../employees-management/create-employee/countriesApi';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent implements OnInit, OnDestroy {
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
    // this.subscription.unsubscribe();
  }
  getOrganization() {
    let id = 1;
    this.organizationAPI.getOrganization(id).subscribe(data => {
      // information form
      this.ConfigurationsFormGroup = this._formBuilder.group({
        organization_name: [data.organization_name],
        organization_street: [data.organization_street],
        organization_building: [data.organization_building],
        organization_floor: [data.organization_floor],
        organization_kra_pin: [data.organization_kra_pin],
        organization_business_no: [data.organization_business_no],
        organization_bank1_name: [data.organization_bank1_name],
        bankbranchCode1: [data.bankbranchCode1],
        bankbranchCode2: [data.bankbranchCode2],
        organization_bank1_account: [data.organization_bank1_account],
        organization_bank2_name: [data.organization_bank2_name],
        organization_bank2_account: [data.organization_bank2_account],
        organization_pay_bill: [data.organization_pay_bill],
        organization_till: [data.organization_till],
        organization_address: [data.organization_address],
        organization_telephone: [data.organization_telephone],
        organization_email: [data.organization_email],
        organization_location: [data.organization_location],
        organization_county: [data.organization_county],
        organization_country: [data.organization_country],
        organization_website: [data.organization_website],
        organization_map_link: [data.organization_map_link],
      });
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
    bankbranchCode1: ['', Validators.required],
    bankbranchCode2: ['', Validators.required],
    organization_bank1_account: ['', Validators.required],
    organization_bank2_name: ['No Configurations'],
    organization_bank2_account: ['No Configurations'],
    organization_pay_bill: ['No Configurations'],
    organization_till: ['No Configurations'],
    organization_address: ['', Validators.required],
    organization_telephone: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(20)]],
    organization_email: ['', [Validators.required, Validators.email]],
    organization_location: ['No Configurations'],
    organization_county: ['', Validators.required],
    organization_country: ['', Validators.required],
    organization_website: ['', Validators.required],
    organization_map_link: ['No Configurations'],
  });

  onSubmit() {
    // console.log("form data",this.ConfigurationsFormGroup.value )
    this.loading = false;
    if (this.ConfigurationsFormGroup.valid) {
      let id = 1;
      this.organizationAPI.updateOrganization(id, this.ConfigurationsFormGroup.value).pipe(first())
        .subscribe(result => {
          this.loading = false;
          this._snackBar.open('Organization metadata configurations updated succefully.', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          
          this.ngZone.run(() => this.router.navigateByUrl('administration/configurations'));
        });

    } else {
      this.loading = false;
      this._snackBar.open('ERROR!, failed to update organization information', 'TRY AGAIN!!', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }

  }

}
