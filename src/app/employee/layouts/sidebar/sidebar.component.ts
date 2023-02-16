import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'src/app/Service/AttendanceService/attendance.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  subscription!:Subscription

  constructor(
    public attendanceAPI: AttendanceService,
  ) { 
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log("user", currentUser)
    this.username = currentUser.username
    this.email = currentUser.email
  }



username: any;
email: any;

  ngOnInit() {
  }
      
  getAttendanceDetail(){

  }

}
