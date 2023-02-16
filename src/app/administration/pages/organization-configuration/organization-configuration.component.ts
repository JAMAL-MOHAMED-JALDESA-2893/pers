import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/Service/Performance/OrganizationService/organization.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';

@Component({
  selector: 'app-organization-configuration',
  templateUrl: './organization-configuration.component.html',
  styleUrls: ['./organization-configuration.component.scss']
})
export class OrganizationConfigurationComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  title = 'Exported Data';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  error = '';
  subscription!: Subscription
  id: any;
  organization_name: any;
  organization_kra_pin: any;
  organization_business_no: any;
  organization_bank1_name: any;
  organization_bank1_account: any;
  organization_bank2_name: any;
  organization_bank2_account: any;
  organization_pay_bill: any;
  organization_till: any;
  organization_address: any;
  organization_telephone: any;
  organization_email: any;
  organization_location: any;
  organization_county: any;
  organization_country: any;
  organization_website: any;
  organization_map_link: any;
  status: any;
  deleted: any;
  created_at: any;
  updated_at: any;
  deleted_at: any;
  showCreateButton =  false;
  showUpdateButton =  false;
  organization_building: any;
  organization_floor: any;
  organization_street: any;
  constructor(
    private organizationAPI: OrganizationService,
    private _snackBar: MatSnackBar,
    private reportAPI: ReportService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder,

    ) { }
  ngOnInit() {
    this.getOrganization();
  }
  getOrganization(){
    let id = 1;
    this.subscription = this.organizationAPI.getOrganization(id).subscribe( data =>{
      console.log("respind", data)
        this.showUpdateButton = true;
        this.showCreateButton =  false;
        this.id = data.id;
        this.organization_name = data.organization_name;
        this.organization_building = data.organization_building;
        this.organization_floor = data.organization_floor;
        this.organization_street = data.organization_street;
        this.organization_kra_pin = data.organization_kra_pin;
        this.organization_business_no = data.organization_business_no;
        this.organization_bank1_name = data.organization_bank1_name;
        this.organization_bank1_account = data.organization_bank1_account;
        this.organization_bank2_name = data.organization_bank2_name;
        this.organization_bank2_account = data.organization_bank2_account;
        this.organization_pay_bill = data.organization_pay_bill;
        this.organization_till = data.organization_till;
        this.organization_address = data.organization_address;
        this.organization_telephone = data.organization_telephone;
        this.organization_email = data.organization_email;
        this.organization_location = data.organization_location;
        this.organization_county = data.organization_county;
        this.organization_country = data.organization_country;
        this.organization_website = data.organization_website;
        this.organization_map_link = data.organization_map_link;
        this.status = data.status;
        this.deleted = data.deleted;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
    },
    error => {
      this.showCreateButton =  true;
      this.showUpdateButton = false;
      this.error = error;
      console.log("Clientside", this.error);
  });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onDelete() {
    if (window.confirm('Are you sure to delete?')) {
      let id = 1;
      this.organizationAPI.deleteOrganization(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }

}
