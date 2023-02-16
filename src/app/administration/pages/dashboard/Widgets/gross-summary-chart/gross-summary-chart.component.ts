import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';

@Component({
  selector: 'app-gross-summary-chart',
  templateUrl: './gross-summary-chart.component.html',
  styleUrls: ['./gross-summary-chart.component.scss']
})
export class GrossSummaryChartComponent implements OnInit {
  highcharts = Highcharts;
  subscription!: Subscription;
  year: any;
  params: any;
  yearsSubscription!:Subscription;
  resData: any;
  options: any;
  barChartoptions: any;
  years: Object | undefined;
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
  const monthsArray = new Array();
  const salaryArray = new Array();
  let params = new HttpParams()
  .set('period_y',year)
  this.subscription = this.salaryAPI.getYearSalarySummary(params).subscribe(res=>{
    this.resData = res;
    for(let i =0; i<this.resData.length; i++){
    monthsArray.push(this.resData[i].months)
    }
    for(let i =0; i<this.resData.length; i++){
      let salary = Math.round(this.resData[i].salary)
      salaryArray.push(salary)
      }
      console.log("Salary", salaryArray);

      this.barChartoptions = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Average Salary Paid per Month',
        },
        subtitle: {
          text: 'API Server',
        },
        xAxis: {
          categories: monthsArray,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Total Salary Paid',
          },
        },
        tooltip: {
          headerFormat:
            '<span style = "font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Total Grosspay Amount Paid',
            data: salaryArray,
          },
        ],
      };
      Highcharts.chart('Account-chart', this.barChartoptions);
    });

}
}