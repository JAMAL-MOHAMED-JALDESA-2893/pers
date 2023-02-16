import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ClearenceService } from 'src/app/Service/ClearenceService/clearence.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';

const middleName = "";

@Component({
  selector: 'app-clearence-request',
  templateUrl: './clearence-request.component.html',
  styleUrls: ['./clearence-request.component.scss']
})
export class ClearenceRequestComponent implements OnInit, OnDestroy {
  dtTrigger: Subject<any> = new Subject<any>();
  title = 'Clearence Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  employeeLeaves: any;
  employeeCount: any;
  reportingTo: any;
  clearenceData: any;
  respond: any;
  approved = true;

  constructor(
    private clearenceAPI: ClearenceService,
    private tokenStorage: TokenStorageService
    ) { }


  ngOnInit() {

    this.getData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [

      ]
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getData() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    const employee_id = currentUser.id;
    this.clearenceAPI.getClearenceByEmployeeId(employee_id).subscribe(data => {
     console.log("employee clearance data", data);

      this.clearenceData = data;
      if(this.clearenceData.clearence_status == "pending"){
        this.approved = false;
      }

    })
  }
  // onDelete(id: any) {
  //   if (window.confirm('Are you sure to delete?')) {
  //     this.clearenceAPI.deleteEmployee(id).subscribe(res => {
  //       // call to destro an instance
  //       this.ngOnDestroy();
  //       // call to reinitialize the table
  //       this.ngOnInit();
  //     })
  //   }
  // }

}
