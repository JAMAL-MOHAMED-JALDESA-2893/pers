import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';;

@Component({
    selector: 'app-senior-executive-dahsboard',
    templateUrl: './senior-executive-dahsboard.component.html',
    styleUrls: ['./senior-executive-dahsboard.component.scss']
})
export class SeniorExecutiveDahsboardComponent {
    subsription!: Subscription;

    //   view: any[] = [700, 400];

    //   // options
    //   gradient: boolean = true;
    //   showLegend: boolean = true;
    //   showLabels: boolean = true;
    //   isDoughnut: boolean = false;
    //   legendPosition: string = 'below';

    //   colorScheme = {
    //     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    //   };

    //   attedanceStatusArray: any = [
    //     'Present','Absent'
    //   ]
    //   employeeActiveStatusArray: any = [
    //     'Active','Inactive','Pending'
    //   ]
    //   employee_status = "Active";

    //   leave_status = "Completed"

    //   employeeLeaveStatusArray: any = [
    //     'Rejected','Completed','Processing','Generated'
    //   ]
    //   attendance_status = 'Absent'


    //   dtTrigger: Subject<any> = new Subject<any>();

    //   title = 'Properties Data Table';
    //   dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
    //   propertyData: any;
    //   e: any;
    //   employeeData: any;
    //   leavesData: any;
    //   resData: any;
    //   name: any;
    //   value: any;
    // datum: any;
    // single!: any[];
    // multi!: any[];

    // myMap! : Map<string, string>;
    //   resNewData: any;
    //   dataResp: any;
    //   totalsData: any;
    //   keyCount:any;
    //   dummyData: any;
    //   activeData: any;
    //   dummyCount: any;
    //   advanceData: any;
    //   advanceCount: any;
    //   // employeeLeavesData: any;
    //   employeeLeavesDataCount: any;
    //   currentMonthlyData: any;
    //   currentMonthlyDataCount: any;
    //   attendanceData:any;
    //   attendanceCount: any;
    //   dataRes: any;
    //   employeeAllData: any;
    //   employeeLeavesData: any;
    //   employeeCount = 0;
    //   selected_status: any;


    //   constructor(
    //     private propertyEnd: PropertyService,
    //     private employeeAPI: EmployeeService,
    //     private reportAPI: ReportService,
    //     private leavesAPI: LeaveService,
    //     private salaryAPI: SalaryService,
    //     private advanceSalaryAPI: AdvanceSalaryService,
    //     private employeeLeaveAPI: LeaveService,
    //     private attendaneAPI: AttendanceService,
    //     private http: HttpClient
    //     ) {

    //      }
    //   ngOnInit() {
    //     this.getSalary();
    //     this.getLeave();
    //     this.getSalaryData();
    //     this.getData();
    //     this.getEmployeesData(this.employee_status);
    //     this.getDummyPayroll();
    //     this.getAdvanceLoans();
    //     this.getEmployeesOnLeaves(this.leave_status);
    //     this.getCurrentMonthlySalary();
    //     this.getAttendance(this.attendance_status);
    //     this.dtOptions = {
    //       pagingType: 'full_numbers',
    //       pageLength: 10,
    //       processing: true,
    //       dom: 'Bfrtip',
    //       buttons: [
    //       ]
    //     }
    //   }
    //   ngOnDestroy(): void {
    //     this.dtTrigger.unsubscribe();
    //   }
    //   saleData = [
    //     { name: "January", value: 10500 },
    //     { name: "February", value: 15500 },
    //     { name: "March", value: 15000 },
    //     { name: "April", value: 15000 },
    //     { name: "May", value: 17000 },
    //     { name: "June", value: 19000 },
    //     { name: "July", value: 20000 },
    //     { name: "August", value: 21000 },
    //     { name: "September", value: 26000 },
    //     { name: "October", value: 11000 },
    //     { name: "November", value: 18000 },
    //     { name: "December", value: 23000 }
    //   ];

    //   deductionsData = [
    //     { name: "PAYE", value: 105000 },
    //     { name: "NHIF", value: 7000 },
    //     { name: "NSSF", value: 55000 },
    //     { name: "HELB", value: 0 },
    //   ];
    // salaryData = [];


    // // ****************************************
    // headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     // API endpoint
    //   baseURL = `${environment.apiUrl}/api/v1/payroll`;

    //   params: any;
    //   getData() {
    //     const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    //     const d = new Date();
    //     const currentDate = new Date()
    //    const getYear = currentDate.getFullYear();
    //     this.params = new HttpParams()
    //   .set('month', monthNames[d.getMonth()])
    //   .set('year', getYear);
    //     let API_URL = `${this.baseURL}/findbyMonth`;
    //     let Totals_URL = `${this.baseURL}/getTotalDeductions`;
    //     return this.http.get(Totals_URL, { params: this.params, headers: this.headers, withCredentials: false }).subscribe(data => {
    //       this.totalsData = data;
    //       this.keyCount  = Object.keys(data).length;
    //       console.log("this  is a good res", this.totalsData)
    //        // Check if date == 1 set the value to be 0
    //        if(this.totalsData.grossPay == null){
    //         this.resNewData  = [
    //           { name: "PAYE", value: 0 },
    //           { name: "NHIF", value: 0 },
    //           { name: "NSSF", value: 0 },
    //           { name: "HELB", value: 0 },
    //           { name: "Gross_Pay", value: 0 },
    //           { name: "Net_Pay", value: 0 },
    //         ]

    //       }else{
    //         this.resNewData  = [
    //           { name: "PAYE", value: this.totalsData.payeTotals },
    //           { name: "NHIF", value: this.totalsData.nhifTotals },
    //           { name: "NSSF", value: this.totalsData.nssfTotals },
    //           { name: "HELB", value: this.totalsData.helbTotals },
    //           { name: "Gross_Pay", value: this.totalsData.grossPay },
    //           { name: "Net_Pay", value: this.totalsData.netPay },
    //         ]

    //       }
    //     })
    //   }

    // getSalaryData(){
    //   this.salaryAPI.getMonthlySalary().pipe(map((res: any) => res.map((data: any) => {
    //     return {
    //       name: data.month,
    //       value: data.monthlySalary,
    //     }
    //   }))).subscribe( results => {
    //     this.resData = results;
    //     console.log("saynomore", this.resData)
    //   });
    // }

    // getSalary(){
    //   this.salaryAPI.getMonthlySalary().subscribe( results => {
    //     console.log("hehksjcamn",results)

    //   })
    // }
    // getCurrentMonthlySalary(){
    //   this.salaryAPI.getCurrentMonthSalaryDetail().subscribe( res => {
    //     this.currentMonthlyData = res;
    //     console.log("console data", res)
    //     this.currentMonthlyDataCount  = Object.keys(res).length;
    //   })
    // }

    // getEmployeesData(employee_status:any){
    //   this.selected_status = employee_status;
    //   this.employee_status = employee_status;
    //   this.params = new HttpParams()
    //   .set('employee_status',this.employee_status);
    //   this.employeeAPI.filterByEmployeeStatus(this.params).subscribe(data =>{
    //     this.employeeAllData = data;
    //     this.employeeCount  = Object.keys(data).length;
    //     this.employeeData = this.employeeAllData.slice(0, 7);

    //   })
    // }




    //   // Get EMployees on Leav
    //   getEmployeesOnLeaves(leave_status:any){
    //     this.leave_status = leave_status;
    //   this.params = new HttpParams()
    //   .set('leave_status',leave_status);
    //     this.subsription = this.employeeLeaveAPI.getAllEmployeeLeaveDetalByStatus(this.params).subscribe(res=>{
    //       this.employeeLeavesData = res;
    //       this.employeeLeavesDataCount  = Object.keys(res).length;
    //       console.log("employee leave", this.employeeLeavesData );

    //     });

    //   }




    //   getLeave() {
    //     this.leavesAPI.getEmployeesLeaves().subscribe(data => {
    //       this.leavesData = data;
    //     })
    //   }
    //   // Get active Employees
    //   getActiveEmployees(){
    //     this.subsription = this.employeeAPI.getActiveEmployees().subscribe(res=>{
    //       this.activeData = res;
    //     })

    //   }

    //   // Get Employees Absentism
    //   getAbsentEmployees(){

    //   }
    //   // Get Dummy Payroll
    //   getDummyPayroll(){
    //     this.subsription = this.salaryAPI.getUnCommitedSalary().subscribe(res=>{
    //       this.dummyData = res;
    //       this.dummyCount  = Object.keys(res).length;
    //     })

    //   }
    //   // Get Advance Loans
    //   getAdvanceLoans(){
    //     this.subsription = this.advanceSalaryAPI.getOpenAdvanceSalarys().subscribe(res=>{
    //       this.advanceData = res;
    //       console.log("data res", res)
    //       this.advanceCount  = Object.keys(res).length;
    //     })

    //   }
    //   //

    //   getAttendance(attendance_status:any){
    //     this.attendance_status = attendance_status;
    //     this.params = new HttpParams()
    //     .set('attendance_status', this.attendance_status);
    //     this.subsription = this.attendaneAPI.getAllFilteredByAttendancesStatus(this.params).subscribe(res=>{
    //       this.dataRes = res;
    //       this.attendanceData  = this.dataRes.slice(0, 7);
    //       this.attendanceCount  = Object.keys(res).length;
    //       console.log("the attendance data are", this.attendanceData);
    //     })
    //   }
    // }
}

