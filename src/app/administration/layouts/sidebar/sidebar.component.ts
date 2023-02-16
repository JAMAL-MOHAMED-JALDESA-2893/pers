import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
is_Director = true;
is_Second_Level_prev =  true;
is_authorised_gen_salary = true;
  role: any;

  constructor() {

    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log("user", currentUser)
    this.username = currentUser.username
    this.email = currentUser.email
  }

username: any;
email: any;

  ngOnInit() {
    this.Authorize();
  }

  Authorize(){
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  this.role = currentUser.roles[0];

  // First Level Authorization - Admin
  if(this.role == "ROLE_DIRECTOR"){
    this.is_Director = true;
    this.is_authorised_gen_salary  = true;
  }
  // Second Level AUthorization - Admin/HR
  if(this.role == "ROLE_DIRECTOR" || this.role == "ROLE_HR"){
    this.is_Second_Level_prev = true;
    this.is_authorised_gen_salary  = true;
  }
  if(this.role == "ROLE_ADMIN"){
    this.is_Second_Level_prev = true;
    
  }
  // Third Level AUthorization - Admin/HR/Supervisor
 
  }
}
