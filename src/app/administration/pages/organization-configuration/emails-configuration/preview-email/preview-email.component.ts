import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailConfigurationService } from '../email-configuration.service';

@Component({
  selector: 'app-preview-email',
  templateUrl: './preview-email.component.html',
  styleUrls: ['./preview-email.component.scss']
})
export class PreviewEmailComponent implements OnInit {
  subcription!: Subscription;
  data: any;
  email_type: any;
  email_salutation: any;
  email_subject: any;
  email_heading: any;
  email_message: any;
  email_remarks: any;
  email_regards_from: any;
  email_organization_name: any;
  email_organization_phone: any;
  email_organization_mail: any;
  email_organization_address: any;
  email_organization_location: any;
  email_organization_website: any;
  id:any;

  constructor(
    private emailConfigAPI: EmailConfigurationService,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subcription = this.emailConfigAPI.getEmailconfigId(id).subscribe(res=>{
      this.data = res;
      this.id = id;
      this.email_type = this.data.email_type;
      this.email_salutation = this.data.email_salutation;
      this.email_subject = this.data.email_subject;
      this.email_heading = this.data.email_heading;
      this.email_message = this.data.email_message;
      this.email_remarks = this.data.email_remarks;
      this.email_regards_from = this.data.email_regards_from;
      this.email_organization_name = this.data.email_organization_name;
      this.email_organization_phone = this.data.email_organization_phone;
      this.email_organization_mail = this.data.email_organization_mail;
      this.email_organization_address = this.data.email_organization_address;
      this.email_organization_location = this.data.email_organization_location;
      this.email_organization_website = this.data.email_organization_website;
    })
  }

}
