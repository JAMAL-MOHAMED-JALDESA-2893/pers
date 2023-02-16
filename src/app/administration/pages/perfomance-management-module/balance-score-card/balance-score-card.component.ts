import { HttpParams } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReviewService } from 'src/app/Service/Performance/ReviewService/review.service';
import { TaskService } from 'src/app/Service/Performance/TaskService/task.service';
import { Component, VERSION, OnInit, OnDestroy } from '@angular/core';

import * as Highcharts from 'highcharts';
import { map } from 'rxjs/operators';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);
const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);
const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);
const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-balance-score-card',
  templateUrl: './balance-score-card.component.html',
  styleUrls: ['./balance-score-card.component.scss']
})
export class BalanceScoreCardComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employeeData: any;
  e: any;
  middleName: string | undefined;
  formData: any;
  employee_id: any;
  employeeEmail: any;
  error: any;
  subscription!: Subscription
  reviewScore: any;
  perfomanceScore: any;
  paramsData: any;
  params: HttpParams | undefined;
  pm_reviews: any;
  bestEmployee: any;
  Firstname: any;
  Middlename: any;
  Lastname: any;
  Departmentname: any;
  Occupation: any;
  Balancescore: any;
  top3EmployeeData: any;
  last3EmployeesData: any;
  employeeRankingData: any;
  status: any;
  perfomanceData: any;
  employeePerfomance: any;
 dataArray!: any[];
  monthlyPerfomanceData: any;
  yearData: any;
  year = 2021;
  employeeCount:any;


  constructor(
    private employeeAPI: EmployeeService,
    private parameterAPI: ParametersService,
    private pmReviewAPI: ReviewService,

  ) { }
  ngOnInit() {
    this.getPerfomanceGroupByYear();
    this.getAllEmployees();
    this.getBestEmployee();
    this.getTop3Employees();
    this.getBottom3Employees();
    this.getEmployeesRanking();
    this.getPerfomanceChartData();
    this.getAveragePerfomanceYearly(this.year);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }
    this.getParameters();

    Highcharts.chart('container', this.options);

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  getParameters() {
    this.subscription = this.parameterAPI.getParameters().subscribe(res => {
      this.paramsData = res;
      console.log("parameter", this.paramsData)
      this.pm_reviews = this.paramsData.pm_reviews;
      console.log("pm reviews", this.paramsData)
    }, err => {

    })
  }

  getPerfomanceGroupByYear(){
    this.subscription = this.pmReviewAPI.getTotalReviewsPerYear().subscribe(res=>{
      this.yearData = res;
    })
  }

  getAveragePerfomanceYearly(year:any){
    this.year = year
    this.params = new HttpParams()
    .set('year', year);
    this.subscription = this.pmReviewAPI.getMonthlyAvgReviewPerYear(this.params).subscribe(res=>{
      this.monthlyPerfomanceData = res;
      console.log("emloyee perfomance", res)
      const perfomanceMonthsArray = Object.keys(res).map(index => {
        let monthsData = this.monthlyPerfomanceData [index];
        return monthsData.month;
      });
      const perfomanceArray = Object.keys(res).map(index => {
          let perfomanceData = this.monthlyPerfomanceData[index];
          return perfomanceData.total_reviews;
      });
      this.options = {
        accessibility: {
            description: '',
        },
        title: {
           text: 'Employees Average Perfomance'
        },
        subtitle: {
            text: 'Sources: Balance Score-card'
        },
        xAxis: {
            categories: perfomanceMonthsArray,
            tickmarkPlacement: 'on',
            title: {
              text: 'Months'
            }
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Average Perfomance of All Employees',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Months',
            data: perfomanceArray,
          type: 'spline'
        }]
      }


      Highcharts.chart('Overal-Perfomance', this.options);

    })
  }
  // getReviewsByParameterandEmployeeId(params: any)
  getAllEmployees() {
    this.subscription = this.employeeAPI.getActiveEmployees().subscribe(data => {
      this.employeeData = data;
      console.log(data)
      // Select all perfomance review per employee
      for (let result of this.employeeData) {
        let employee_id = result.id;
        this.subscription = this.pmReviewAPI.getAverageReviewsByEmployeeId(employee_id).subscribe(res => {
          this.reviewScore = res;
          console.log("this is by employees", this.reviewScore)
        })


      }

    })
  }
  public options: any = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Perfomance Score'
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    },
    series: [
      {
        name: 'Ahmedabad',
        data: [3.0, 15.9, 19.5, 16.5, 25.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'Nadiad',
        data: [5.2, 2.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      },
      {
        name: 'Surat',
        data: [4.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {
        name: 'Mumbai',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ]
  }

  getPerfomanceChartData() {
    this.subscription = this.pmReviewAPI.getReviewsRanking().subscribe(res => {
      // get employee id's
      this.perfomanceData = res;
      for (let employee of this.perfomanceData) {
        console.log("this are employees", employee)
        let employee_id = employee.employeeid;
        let Firstname = employee.firstname;
        // find data by id
        this.subscription = this.pmReviewAPI.getReviewsByEmployeeId(employee_id).pipe(map((res: any) => res.map((data: any) => {
          return {
            name: "Collins",
            data: data.percentage_score,
          }
        }))).subscribe(resData=>{
          console.log("hey responded data ", resData[0])

          this.options = {
            chart: {
              type: 'spline',
            },
            title: {
              text: 'Perfomance Score'
            },
            credits: {
              enabled: false
            },

            xAxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            },
            series: [
              resData[2]

            ]
          }

          Highcharts.chart('employeeData', this.options);

        })

      }


    })




  }


  getBestEmployee() {
    this.subscription = this.pmReviewAPI.getBestRanking().subscribe(res => {
      this.bestEmployee = res;
      this.Firstname = this.bestEmployee.firstname;
      this.Middlename = this.bestEmployee.middlename;
      this.Lastname = this.bestEmployee.lastname;
      this.Departmentname = this.bestEmployee.departmentname;
      this.Occupation = this.bestEmployee.occupation;
      this.Balancescore = this.bestEmployee.balancescore;
    }, err => {

    })
  }
  getTop3Employees() {
    this.subscription = this.pmReviewAPI.getTop3Employees().subscribe(res => {
      this.top3EmployeeData = res;
      console.log("top 3", this.top3EmployeeData)
    }, err => {

    })
  }
  getBottom3Employees() {
    this.subscription = this.pmReviewAPI.getLast3Employees().subscribe(res => {
      this.last3EmployeesData = res;
    }, err => {

    })

  }
  getEmployeesRanking() {
    this.subscription = this.pmReviewAPI.getReviewsRanking().subscribe(res => {
      this.employeeRankingData = res;
    this.employeeCount  = Object.keys(res).length;
      for (let result of this.employeeRankingData) {
        let pf_score = result.balancescore;
        if (pf_score < 40) {
          this.status = "Poor"
        }
        if (pf_score > 40 && pf_score < 50) {
          this.status = "Satisfactory"
        }
        if (pf_score > 50 && pf_score < 70) {
          this.status = "Good"
        }
        if (pf_score > 70 && pf_score <= 100) {
          this.status = "Excelent"
        }


      }

    }, err => {

    })

  }




}
