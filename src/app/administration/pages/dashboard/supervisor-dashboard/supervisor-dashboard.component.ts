import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvanceSalaryService } from 'src/app/Service/AdavanceSalary/advance-salary.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { LeaveService } from 'src/app/Service/LeaveService/leave.service';
import { PropertyService } from 'src/app/Service/PropertyService/property.service';
import { ReportService } from 'src/app/Service/ReportService/report.service';
import { SalaryService } from 'src/app/Service/SalaryService/salary.service';

import { Component, VERSION ,OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
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
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.scss']
})
export class SupervisorDashboardComponent implements OnInit, OnDestroy {
  subsription!:Subscription;

  



  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  dtTrigger: Subject<any> = new Subject<any>();

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  propertyData: any;
  e: any;
  employeeData: any;
  leavesData: any;
  resData: any;
  name: any;
  value: any;
datum: any;
single!: any[];
multi!: any[];

myMap! : Map<string, string>;
  resNewData: any;
  dataResp: any;
  totalsData: any;
  keyCount:any;
  dummyData: any;
  activeData: any;
  dummyCount: any;
  advanceData: any;
  advanceCount: any;
  employeeLeavesData: any;
  employeeLeavesDataCount: any;
  currentMonthlyData: any;
  currentMonthlyDataCount: any;
  emData: any;
  resultsData: any;
  Highcharts: any;
  chartOptions: any;
  highcharts: any;
  dataArray: any;
  options: any;


  constructor(
    private propertyEnd: PropertyService,
    private employeeAPI: EmployeeService,
    private reportAPI: ReportService,
    private leavesAPI: LeaveService,
    private salaryAPI: SalaryService,
    private advanceSalaryAPI: AdvanceSalaryService,
    private employeeLeaveAPI: LeaveService,
    private http: HttpClient,
    
    ) {

     }


  ngOnInit() {
    this.countPaidEmployees();
    this.getSalary();
    this.getLeave();
    this.getSalaryData();
    this.getEmployeesData();
    this.getDummyPayroll();
    this. getAdvanceLoans();
    this.getEmployeesOnLeaves();
    this.getCurrentMonthlySalary();
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



getSalary(){
  this.salaryAPI.getMonthlySalary().subscribe( results => {
    console.log("hehksjcamn",results)

  })
}
getCurrentMonthlySalary(){
  this.salaryAPI.getCurrentMonthSalaryDetail().subscribe( res => {
    this.currentMonthlyData = res;
    console.log("console data", res)
    this.currentMonthlyDataCount  = Object.keys(res).length;
  })
}

getEmployeesData(){
  this.employeeAPI.getActiveEmployees().subscribe(data =>{
    this.employeeData = data;
  })
}
  getLeave() {
    this.leavesAPI.getEmployeesLeaves().subscribe(data => {
      this.leavesData = data;
    })
  }
  // Get active Employees
  getActiveEmployees(){
    this.subsription = this.employeeAPI.getActiveEmployees().subscribe(res=>{
      this.activeData = res;
    })
    
  }
  // Get EMployees on Leave
  getEmployeesOnLeaves(){
    this.subsription = this.employeeLeaveAPI.getAllEmployeeLeaveDetal().subscribe(res=>{
      this.employeeLeavesData = res;
      console.log("this employee on leaves",)
      this.employeeLeavesDataCount  = Object.keys(res).length;
    });

  }
  // Get Employees Absentism
  getAbsentEmployees(){

  }
  // Get Dummy Payroll
  getDummyPayroll(){
    this.subsription = this.salaryAPI.getUnCommitedSalary().subscribe(res=>{
      this.dummyData = res;
      this.dummyCount  = Object.keys(res).length;
    })

  }
  // Get Advance Loans
  getAdvanceLoans(){
    this.subsription = this.advanceSalaryAPI.getOpenAdvanceSalarys().subscribe(res=>{
      this.advanceData = res;
      console.log("data res", res)
      this.advanceCount  = Object.keys(res).length;
    })

  }
  // 

  countPaidEmployees(){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    const employee_id = currentUser.id;
    this.subsription = this.employeeAPI.getEmployeeId(employee_id).subscribe(resData=>{
      this.emData = resData;
    this.subsription = this.salaryAPI.countPaidEmployees(this.emData.departmentId).subscribe(res=>{

   
  const monthsArray = Object.keys(res).map(index => {
      let monthsData = res[index];
      return monthsData.months;
  });
  const employeesArray = Object.keys(res).map(index => {
    let employeesData = res[index];
    return employeesData.employees;
});
      // this.highcharts = Highcharts;
      this.options = {
        title: {
          text: "Department Active Employees "
        },
        subtitle: {
            text: 'Sources: Payroll-ERP'
        },
        xAxis: {
          title: {
            text: 'Months'
          },
          categories: monthsArray
        },
        yAxis: {
          title: {
            text: "Number of Employees"
          }
        },
        series: [{
          data: employeesArray,
          type: 'spline'
        }]
      }

  Highcharts.chart('employeeCount', this.options);

    })
    })
  }






  onDelete(id: any) {
    if (window.confirm('Are you sure to delete?')) {
      this.propertyEnd.deleteProperty(id).subscribe(res => {
        // call to destro an instance
        this.ngOnDestroy();
        // call to reinitialize the table
        this.ngOnInit();
      })
    }
  }


  // getSalaryData(){
  //   this.salaryAPI.getMonthlySalary().pipe(map((res: any) => res.map((data: any) => {
  //     return {
  //       name: data.month,
  //       value: data.monthlySalary,
  //     }
  //   }))).subscribe( results => {
  //     this.resData = results;
  //     console.log("saynomore", this.resData)
  //     console.log("saynomore", data.month)
  //     console.log("saynomore2", this.resData[0])
  //   });
  // }
  
  getSalaryData(){
    this.salaryAPI.getMonthlySalary().subscribe(res=>{
      const salaryMonthsArray = Object.keys(res).map(index => {
        let salaryData = res[index];
        return salaryData.month;
    });
    const salaryAmountArray = Object.keys(res).map(index => {
      let salaryData = res[index];
      return salaryData.monthlySalary;
  });
  
  this.options = {
    chart: {
       type: 'bar'
    },
    accessibility: {
        description: '',
    },
    title: {
       text: 'Payroll summary of your department employees.'
    },
    subtitle: {
        text: 'Sources: Payroll-ERP'
    },
    xAxis: {
        categories: salaryMonthsArray,
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
    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     shadow: true
    // },
    series: [{
        name: 'Year 2021',
        data: salaryAmountArray 
    }]
  }


  Highcharts.chart('container', this.options);

    

    })
  }



  // public options: any = {
  //   chart: {
  //      type: 'bar'
  //   },
  //   accessibility: {
  //       description: '',
  //   },
  //   title: {
  //      text: 'Payroll summary of your department employees.'
  //   },
  //   subtitle: {
  //       text: 'Sources: Payroll-ERP'
  //   },
  //   xAxis: {
  //       categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
  //       tickmarkPlacement: 'on',
  //       title: {
  //           enabled: false
  //       }
  //   },
  //   yAxis: {
  //       min: 0,
  //       title: {
  //           text: 'Population (millions)',
  //           align: 'high'
  //       },
  //       labels: {
  //           overflow: 'justify'
  //       }
  //   },
  //   tooltip: {
  //       valueSuffix: ' millions'
  //   },
  //   plotOptions: {
  //       bar: {
  //           dataLabels: {
  //               enabled: true
  //           }
  //       }
  //   },
  //   legend: {
  //       layout: 'vertical',
  //       align: 'right',
  //       verticalAlign: 'top',
  //       x: -40,
  //       y: 80,
  //       floating: true,
  //       borderWidth: 1,
  //       shadow: true
  //   },
  //   series: [{
  //       name: 'Year 1800',
  //       data: [107, 31, 635, 203, 2] 
  //   }]
  // }



}
