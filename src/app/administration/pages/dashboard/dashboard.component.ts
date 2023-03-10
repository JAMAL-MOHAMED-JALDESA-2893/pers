import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  is_Director = false;
is_Second_Level_prev =  false;
  role: any;
  is_Supervisor: any;

  constructor() { }

  ngOnInit() {
    this.Authorize();
  }



  Authorize(){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[0];
  
    // First Level Authorization - Admin
    if(this.role == "ROLE_DIRECTOR"){
      this.is_Director = true;
    }
    // Second Level AUthorization - Admin/HR
    if(this.role == "ROLE_DIRECTOR" || this.role == "ROLE_HR"){
      this.is_Second_Level_prev = true;
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    if(this.role == "ROLE_SUPERVISOR"){
      this.is_Supervisor = true;
    }
    }


}
