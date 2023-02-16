import { EmployeeService } from '../../../Service/EmployeeService/employee.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit {
  resData: any;
  getYear: number;
  getMonth: string;
  year: any;
  month: any;
  totalNssf: any;
  totalNhif: any;
  totalPaye: any;
  totalGrosspay: any;
  totalNetpay: any;
  totalEmployees: any;
  date = new Date();
  constructor(
    private salaryAPI: SalaryService,
  ) {
    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    var d = new Date();
    const currentDate = new Date()
   this.getYear = currentDate.getFullYear();
   this.getMonth  = monthNames[currentDate.getMonth()]

  }
  ngOnInit() {
    this.getSalarySummary();
  }
    getSalarySummary(){
      let params = new HttpParams()
      .set('period_m','July')
      .set('period_y','2021');
      this.salaryAPI.getSalarySummary(params).subscribe(res=>{
        this.resData = res;
        this.year = this.resData.year,
        this.month = this.resData.month,
        this.totalNssf = this.resData.totalNssf,
        this.totalNhif = this.resData.totalNhif,
        this.totalPaye = this.resData.totalPaye,
        this.totalGrosspay = this.resData.totalGrosspay,
        this.totalNetpay = this.resData.totalNetpay,
        this.totalEmployees = this.resData.totalEmployees
      })
    }
  }
