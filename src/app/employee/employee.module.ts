import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LeaveRequestsComponent } from './Pages/leave-requests/leave-requests.component';
import { YourLeavesComponent } from './Pages/your-leaves/your-leaves.component';
import { YourLoansComponent } from './Pages/your-loans/your-loans.component';
import { YourPayrollComponent } from './Pages/your-payroll/your-payroll.component';
import { InfoCardsComponent } from './shared/info-cards/info-cards.component';
import { MakeLeaveRequestComponent } from './Pages/leave-requests/make-leave-request/make-leave-request.component';
import { UpdateLeaveRequestComponent } from './Pages/leave-requests/update-leave-request/update-leave-request.component';
import { PayslipComponent } from './Pages/your-payroll/payslip/payslip.component';
import { ClearenceRequestComponent } from './Pages/clearence-request/clearence-request.component';
import { CreateClearenceComponent } from './Pages/clearence-request/create-clearence/create-clearence.component';
import { UpdatedClearenceComponent } from './Pages/clearence-request/updated-clearence/updated-clearence.component';
import { ViewClearenceComponent } from './Pages/clearence-request/view-clearence/view-clearence.component';
import { AdvanceSalaryComponent } from './Pages/advance-salary/advance-salary.component';
import { ApplyAdvanceComponent } from './Pages/advance-salary/apply-advance/apply-advance.component';
import { AssignedTasksComponent } from './Pages/assigned-tasks/assigned-tasks.component';
import { ExploreTaskComponent } from './Pages/assigned-tasks/explore-task/explore-task.component';
import { UpdateAdvanceComponent } from './Pages/advance-salary/update-advance/update-advance.component';
import { YourGoalsComponent } from './Pages/your-goals/your-goals.component';
import { CommentComponent } from './Pages/your-goals/comment/comment.component';
import { ReplyComponent } from './Pages/your-goals/reply/reply.component';
import { SubReplyComponent } from './Pages/your-goals/sub-reply/sub-reply.component';
import { ReviewComponent } from './Pages/your-goals/review/review.component';
import { AttendanceComponent } from './Pages/attendance/attendance.component';
import { EmployeeUserProfileComponent } from './shared/employee-user-profile/employee-user-profile.component';
import { LeaveFAQSComponent } from './Pages/leave-requests/leave-faqs/leave-faqs.component';
import { P9Component } from './Pages/p9/p9.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    LeaveRequestsComponent,
    YourLeavesComponent,
    YourLoansComponent,
    YourPayrollComponent,
    InfoCardsComponent,
    MakeLeaveRequestComponent,
    UpdateLeaveRequestComponent,
    PayslipComponent,
    ClearenceRequestComponent,
    CreateClearenceComponent,
    UpdatedClearenceComponent,
    ViewClearenceComponent,
    AdvanceSalaryComponent,
    ApplyAdvanceComponent,
    AssignedTasksComponent,
    ExploreTaskComponent,
    UpdateAdvanceComponent,
    YourGoalsComponent,
    CommentComponent,
    ReplyComponent,
    SubReplyComponent,
    ReviewComponent,
    AttendanceComponent,
    EmployeeUserProfileComponent,
    LeaveFAQSComponent,
    P9Component
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,

    CommonModule,
    DataTablesModule,
    RouterModule,
    HighchartsChartModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InfoCardsComponent,
  ],
})
export class EmployeeModule { }
