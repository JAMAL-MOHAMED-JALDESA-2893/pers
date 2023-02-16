import { HttpParams } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { ParametersService } from 'src/app/Service/Performance/PerfomanceParams/parameters.service';
import { ReviewService } from 'src/app/Service/Performance/ReviewService/review.service';
import { Component, VERSION ,OnInit, OnDestroy } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-individual-score-card',
  templateUrl: './individual-score-card.component.html',
  styleUrls: ['./individual-score-card.component.scss']
})
export class IndividualScoreCardComponent implements OnInit, OnDestroy {
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
  yearData: any;
  year = 2021;
  monthlyPerfomanceData: any;
  paramsEmployeeData: any;
  constructor(
    private employeeAPI: EmployeeService,
    private actRoute: ActivatedRoute,
    private parameterAPI: ParametersService,
    private pmReviewAPI: ReviewService,
    ) { }
  ngOnInit() {
    this.getPerfomanceGroupByYear();
    this. getAllEmployees();
    this.getReviewData();
    this.getSumEmployee();
    this.getParametersByEmployeeId();
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
  getParametersByEmployeeId(){
    const employee_id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.parameterAPI.getParameterByEmployeeId(employee_id).subscribe(res=>{
      this.paramsEmployeeData = res;
      console.log("parameter employee", this.paramsEmployeeData )
      this.pm_reviews = this.paramsData.pm_reviews;
      console.log("pm reviews", this.paramsData )
    }, err=>{
    })
  }


  // getReviewsByParameterandEmployeeId(params: any)
  getAllEmployees() {
    this.subscription = this.employeeAPI.getActiveEmployees().subscribe(data => {
      this.employeeData = data;
      console.log(data)
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



  getPerfomanceGroupByYear(){
    this.subscription = this.pmReviewAPI.getTotalReviewsPerYear().subscribe(res=>{
      this.yearData = res;
    })
  }

  getAveragePerfomanceYearly(year:any){
    this.year=year;
   this.employee_id = this.actRoute.snapshot.paramMap.get('id');
    this.params = new HttpParams()
    .set('employee_id', this.employee_id)
    .set('year', year);
    this.subscription = this.pmReviewAPI.getEmployeeMonthlyAvgReviewPerYear(this.params).subscribe(res=>{
      this.monthlyPerfomanceData = res;
      const perfomanceMonthsArray = Object.keys(res).map(index => {
        let monthsData = this.monthlyPerfomanceData [index];
        return monthsData.month;
      });
      const perfomanceArray = Object.keys(res).map(index => {
          let perfomanceData = this.monthlyPerfomanceData[index];
          return perfomanceData.employeeperfomance;
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


      Highcharts.chart('Yearly-Perfomance', this.options);

    })
  }

  // /find/review/yearly/by/employee/




getSumEmployee(){
  const employee_id = this.actRoute.snapshot.paramMap.get('id');
  this.subscription = this.pmReviewAPI.getSumByEmployeeId(employee_id).subscribe(res=>{
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
    const employee_id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.pmReviewAPI. getByEmployeeId(employee_id).subscribe(res=>{
      this.reviewData = res;
      console.log("Data review",this.reviewData )
    }, err=>{

    })
  }
}

