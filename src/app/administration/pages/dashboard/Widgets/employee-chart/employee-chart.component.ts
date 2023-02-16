import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.scss']
})
export class EmployeeChartComponent implements OnInit {
  highcharts = Highcharts;
  subscription!: Subscription;
  yearsSubscription!:Subscription;
  year: any;
  params: any;
  resData: any;
  options: any;
  needYear = false;
  needMonth = false;
  chartDispType: any = ['Year-wise','Month-wise','Date-wise']
  monthsArray: any = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  currentYear = new Date().getFullYear()
  currentMonth = this.monthsArray[new Date().getMonth()];
  month: any;
  yearArray: any;
  selectedYear: any;
  constructor(
    private fb: FormBuilder,
    private salaryAPI: SalaryService
  ) { }

  ngOnInit(): void {
    this.getYears();
    this.getYearWiseData(2021);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.yearsSubscription.unsubscribe()
}
datewiseForm = this.fb.group({
  period:[''],
  year:[this.currentYear],
  month:[this.currentMonth],
})
getYears(){
  this.yearsSubscription = this.salaryAPI.getPayrollYears().subscribe(res=>{
    this.yearArray = res;
  })
}
onSelectPeriod(event:any){
  this.getYearWiseData(event.value)
}
getYearWiseData(year:any){
  this.selectedYear = year;
  const employeesArray = new Array();
  const monthsArray = new Array();
  let params = new HttpParams()
  .set('period_y',year)
  this.subscription = this.salaryAPI.getEmployeeSalarySummary(params).subscribe(res=>{
    this.resData = res;
    console.log("Data Responded", this.resData);

    for(let i =0; i<this.resData.length; i++){
      let employee = Math.round(this.resData[i].totalEmployee)
    employeesArray.push(employee)
    }
    for(let i =0; i<this.resData.length; i++){
      monthsArray.push(this.resData[i].month)
      }
  this.options = {
    accessibility: {
        description: '',
    },
    title: {
       text: 'Average No of Employees Annually'
    },
    subtitle: {
        text: 'Sources: API'
    },
    xAxis: {
        categories: monthsArray,
        tickmarkPlacement: 'on',
        title: {
          text: 'Years'
        }
    },

    yAxis: {
        min: 0,
        title: {
            text: 'Per MOnth',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' Employees'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Active ',
        data:  employeesArray,
      type: 'spline'
    }]
  }
  Highcharts.chart('Overal-Perfomance', this.options);
})
}
}