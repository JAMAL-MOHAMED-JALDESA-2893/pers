import { CreateClearenceComponent } from './Pages/clearence-request/create-clearence/create-clearence.component';
import { PayslipComponent } from './Pages/your-payroll/payslip/payslip.component';
import { UpdateLeaveRequestComponent } from './Pages/leave-requests/update-leave-request/update-leave-request.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LeaveRequestsComponent } from './Pages/leave-requests/leave-requests.component';
import { MakeLeaveRequestComponent } from './Pages/leave-requests/make-leave-request/make-leave-request.component';
import { YourPayrollComponent } from './Pages/your-payroll/your-payroll.component';
import { ClearenceRequestComponent } from './Pages/clearence-request/clearence-request.component';
import { UpdatedClearenceComponent } from './Pages/clearence-request/updated-clearence/updated-clearence.component';
import { AdvanceSalaryComponent } from './Pages/advance-salary/advance-salary.component';
import { ApplyAdvanceComponent } from './Pages/advance-salary/apply-advance/apply-advance.component';
import { AssignedTasksComponent } from './Pages/assigned-tasks/assigned-tasks.component';
import { ExploreTaskComponent } from './Pages/assigned-tasks/explore-task/explore-task.component';
import { UpdateAdvanceComponent } from './Pages/advance-salary/update-advance/update-advance.component';
import { YourGoalsComponent } from './Pages/your-goals/your-goals.component';
import { ReviewComponent } from './Pages/your-goals/review/review.component';
import { EmployeeUserProfileComponent } from './shared/employee-user-profile/employee-user-profile.component';
import { P9Component } from './Pages/p9/p9.component';

const routes: Routes = [{
  path: '',
  component: EmployeeComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },

    
        
    {
      path:'employee/profile',
      component: EmployeeUserProfileComponent 
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    
    {
      path:'assigned/tasks',
      component: AssignedTasksComponent
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    {
      path:'assigned/tasks/explore/:id',
      component:  ExploreTaskComponent
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
   
    {
      path:'leave/requests',
      component: LeaveRequestsComponent
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },

    {
      path:'leave/requests/make',
      component: MakeLeaveRequestComponent
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    {
      path: 'leave/requests/update/:id',
      component: UpdateLeaveRequestComponent
         // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },

    {
      path: 'payroll',
      component: YourPayrollComponent,
    },

    {
      path: 'payslip/:id',
      component: PayslipComponent,
         // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    
{
path: 'p9',
component: P9Component,
// canActivate: [ AuthGuard ],
// data: { preload:true },
},

    {
      path: 'clearence',
      component: ClearenceRequestComponent,
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },

    {
      path: 'clearence/create',
      component: CreateClearenceComponent,
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    {
      path: 'clearence/update/:id',
      component: UpdatedClearenceComponent,
      // canActivate: [ AuthGuard ],
      // data: { preload:true },
    },
    {
      path: 'employee/advance/salary/apply',
      component: ApplyAdvanceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.ROLE_SUPERVISOR], preload:true }
    },
    {
      path: 'employee/advance/salary',
      component: AdvanceSalaryComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.ROLE_SUPERVISOR], preload:true }
    },
    {
      path: 'employee/advance/salary/update/:id',
      component: UpdateAdvanceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.ROLE_SUPERVISOR], preload:true }
    },
    
    {
      path: 'employee/goals',
      component:YourGoalsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.ROLE_SUPERVISOR], preload:true }
    },

    {
      path: 'employee/perfomance/management/evaluation/goals/review/:id',
      component: ReviewComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.ROLE_SUPERVISOR], preload:true }
    },



    // {
    //   path: 'employee/salary/:id',
    //   component: EmployeeSalaryComponent,
    // },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
