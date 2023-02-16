import { HttpParams } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReviewService } from 'src/app/Service/Performance/ReviewService/review.service';
import { TaskService } from 'src/app/Service/Performance/TaskService/task.service';
import { Component, VERSION ,OnInit, OnDestroy } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
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
  paramsData:any;
  params: HttpParams | undefined;
  pm_reviews: any;
  reviewData: any;
  employeeReview: any;
  Middlename: any;
  Firstname: any;
  Lastname: any;
  Department: any;
  Occupation: any;
  salaryData: any;
  pmReviewData: any;
  constructor(
    private employeeAPI: EmployeeService,
    private actRoute: ActivatedRoute,
    private parameterAPI: ParametersService,
    private salaryAPI: SalaryService,
    private pmReviewAPI: ReviewService,
    ) { }
  ngOnInit() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.employee_id = currentUser.employeeDetails.id;
    this. getAllEmployees();
    this.getReviewData();
    this.getSumEmployee();
    this.getEmployeeLastSixMonths();
    this.getAvgReviewByEmployeeId();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }
    this. getParameters();

    Highcharts.chart('container', this.options);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    // this.dtTrigger.unsubscribe();
  }
  getParameters(){
    this.subscription = this.parameterAPI.getParameters().subscribe(res=>{
      this.paramsData = res;
      console.log("parameter", this.paramsData )
      this.pm_reviews = this.paramsData.pm_reviews;
      console.log("pm reviews", this.paramsData )
    }, err=>{
    })
  }
  getEmployeeLastSixMonths(){
    this.subscription = this.salaryAPI.getEmployeeLastMonthsSalary(this.employee_id).subscribe(res=>{
      console.log("salary data received");
      console.log(res);
      this.salaryData = res;
    })
  }
  getAvgReviewByEmployeeId(){
    // let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.subscription = this.pmReviewAPI.getAvgReviewByEmployeeId(this.employee_id).subscribe(res=>{
      this.pmReviewData = res;
      const perfomanceMonthsArray = Object.keys(res).map(index => {
        let monthsData = this.pmReviewData[index];
        return monthsData.month;
      });
      const perfomanceArray = Object.keys(res).map(index => {
          let perfomanceData = this.pmReviewData[index];
          return perfomanceData.employeeperfomance;
      });
      this.options = {
        accessibility: {
            description: '',
        },
        title: {
           text: 'Your Average Perfomance'
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
                text: 'Salary Amount(Ksh)',
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


      Highcharts.chart('perfomance-chart', this.options);




    })
  }
  // getReviewsByParameterandEmployeeId(params: any)
  getAllEmployees() {
    this.subscription = this.employeeAPI.getActiveEmployees().subscribe(data => {
      this.employeeData = data;
      console.log(data);
      // Select all perfomance review per employee
      for(let result of this.employeeData){
        let employee_id = result.id;
        this.subscription = this.pmReviewAPI.getAverageReviewsByEmployeeId(employee_id).subscribe(res=>{
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
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    },
    series: [
         {
            name: 'Ahmedabad',
            data: [3.0, 15.9, 19.5, 16.5, 25.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
         }
      ]
  }




getSumEmployee(){
  // const employee_id = this.actRoute.snapshot.paramMap.get('id');
  this.subscription = this.pmReviewAPI.getSumByEmployeeId(this.employee_id).subscribe(res=>{
    this.employeeReview = res;
    console.log("employee metadata", this.employeeReview)
    this.Firstname = this.employeeReview.firstname;
    this.Middlename = this.employeeReview.middlename;
    this.Lastname = this.employeeReview.lastname;
    this.Department = this.employeeReview.departmentname;
    this.Occupation = this.employeeReview.occupation;
  })
}

  //
  getReviewData(){
    // const employee_id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.pmReviewAPI. getByEmployeeId(this.employee_id).subscribe(res=>{
      this.reviewData = res;
      console.log("Data review",this.reviewData )
    }, err=>{

    })
  }
}

