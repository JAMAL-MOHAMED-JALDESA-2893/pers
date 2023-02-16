import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/helpers/auth.guard';
import { Role } from 'src/@core/Models/role/role.model';
import { AdministrationComponent } from './administration.component';
import { AbsentismConfigComponent } from './pages/absentism-component/absentism-config/absentism-config.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { ApprovedAccountsComponent } from './pages/account-management/approved-accounts/approved-accounts.component';
import { PendingAccountsComponent } from './pages/account-management/pending-accounts/pending-accounts.component';
import { RevokedAccountsComponent } from './pages/account-management/revoked-accounts/revoked-accounts.component';
import { UpdateRoleComponent } from './pages/account-management/update-role/update-role.component';
import { AdvanceSalaryParamsComponent } from './pages/advance-salary/advance-salary-params/advance-salary-params.component';
import { CreateAdvanceParameterComponent } from './pages/advance-salary/advance-salary-params/create-advance-parameter/create-advance-parameter.component';
import { UpdateAdvanceParameterComponent } from './pages/advance-salary/advance-salary-params/update-advance-parameter/update-advance-parameter.component';
import { AdvanceSalaryComponent } from './pages/advance-salary/advance-salary.component';
import { ApplyAdvanceComponent } from './pages/advance-salary/apply-advance/apply-advance.component';
import { AddCustomAllowanceComponent } from './pages/allowances/add-custom-allowance/add-custom-allowance.component';
import { AddallowancebenefitsComponent } from './pages/allowances/allowancebenefits/addallowancebenefits/addallowancebenefits.component';
import { ManageallowancebenefitsComponent } from './pages/allowances/allowancebenefits/manageallowancebenefits/manageallowancebenefits.component';
import { UpdateallowancebenefitsComponent } from './pages/allowances/allowancebenefits/updateallowancebenefits/updateallowancebenefits.component';
import { AllowancesComponent } from './pages/allowances/allowances.component';
import { UpdateCustomAllowanceComponent } from './pages/allowances/update-custom-allowance/update-custom-allowance.component';
import { AttendanceConfigurationsComponent } from './pages/attendance-management/attendance-configurations/attendance-configurations.component';
import { AttendanceManagementComponent } from './pages/attendance-management/attendance-management.component';
import { HolidayConfigurationsComponent } from './pages/attendance-management/holiday-configurations/holiday-configurations.component';
import { TimeSheetComponent } from './pages/attendance-management/time-sheet/time-sheet.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateDepartmentComponent } from './pages/departments-management/create-department/create-department.component';
import { DepartmentEmployeesComponent } from './pages/departments-management/department-employees/department-employees.component';
import { DepartmentsManagementComponent } from './pages/departments-management/departments-management.component';
import { UpdateDepartmentComponent } from './pages/departments-management/update-department/update-department.component';
import { ActiveEmployeesComponent } from './pages/employees-management/active-employees/active-employees.component';
import { CreateEmployeeComponent } from './pages/employees-management/create-employee/create-employee.component';
import { EmployeeDetailComponent } from './pages/employees-management/employee-detail/employee-detail.component';
import { HoldEmployeeComponent } from './pages/employees-management/employee-detail/hold-employee/hold-employee.component';
import { EmployeeSalaryComponent } from './pages/employees-management/employee-salary/employee-salary.component';
import { EmployeesManagementComponent } from './pages/employees-management/employees-management.component';
import { InactiveEmployeesComponent } from './pages/employees-management/inactive-employees/inactive-employees.component';
import { PendingEmployeesComponent } from './pages/employees-management/pending-employees/pending-employees.component';
import { PromoteEmployeeComponent } from './pages/employees-management/promote-employee/promote-employee.component';
import { PromotionsComponent } from './pages/employees-management/promotions/promotions.component';
import { TrashedEmployeesComponent } from './pages/employees-management/trashed-employees/trashed-employees.component';
import { UpdateEducationComponent } from './pages/employees-management/update-employee/update-education/update-education.component';
import { UpdateEmployeeComponent } from './pages/employees-management/update-employee/update-employee.component';
import { UpdateExperienceComponent } from './pages/employees-management/update-employee/update-experience/update-experience.component';
import { LeaveTypeComponentComponent } from './pages/leave-type-component/leave-type-component.component';
import { UpdateLeaveTypeComponent } from './pages/leave-type-component/update-leave-type/update-leave-type.component';
import { ApplyLeaveComponent } from './pages/leaves-management/apply-leave/apply-leave.component';
import { CreateLeaveTypeComponent } from './pages/leaves-management/create-leave-type/create-leave-type.component';
import { InactiveEmployeeLeavesComponent } from './pages/leaves-management/inactive-employee-leaves/inactive-employee-leaves.component';
import { LeaveRequestUpdateComponent } from './pages/leaves-management/leave-request-update/leave-request-update.component';
import { LeavesManagementComponent } from './pages/leaves-management/leaves-management.component';
import { MyLeaveRequestsComponent } from './pages/leaves-management/my-leave-requests/my-leave-requests.component';
import { BatchProcessesComponent } from './pages/organization-configuration/batch-processes/batch-processes.component';
import { CreateOrganizationComponent } from './pages/organization-configuration/create-organization/create-organization.component';
import { AddEmailConfigurationComponent } from './pages/organization-configuration/emails-configuration/add-email-configuration/add-email-configuration.component';
import { EmailsConfigurationComponent } from './pages/organization-configuration/emails-configuration/emails-configuration.component';
import { PreviewEmailComponent } from './pages/organization-configuration/emails-configuration/preview-email/preview-email.component';
import { UpdateEmailConfigurationComponent } from './pages/organization-configuration/emails-configuration/update-email-configuration/update-email-configuration.component';
import { CreateKraComponent } from './pages/organization-configuration/kra-configurations/create-kra/create-kra.component';
import { KraConfigurationsComponent } from './pages/organization-configuration/kra-configurations/kra-configurations.component';
import { UpdateKraComponent } from './pages/organization-configuration/kra-configurations/update-kra/update-kra.component';
import { AddTaxBandComponent } from './pages/organization-configuration/nhif-configurations/add-tax-band/add-tax-band.component';
import { NhifConfigurationsComponent } from './pages/organization-configuration/nhif-configurations/nhif-configurations.component';
import { UpdateTaxBandComponent } from './pages/organization-configuration/nhif-configurations/update-tax-band/update-tax-band.component';
import { AddNssfComponent } from './pages/organization-configuration/nssf-configurations/add-nssf/add-nssf.component';
import { NssfConfigurationsComponent } from './pages/organization-configuration/nssf-configurations/nssf-configurations.component';
import { UpdateNssfComponent } from './pages/organization-configuration/nssf-configurations/update-nssf/update-nssf.component';
import { OrganizationConfigurationComponent } from './pages/organization-configuration/organization-configuration.component';
import { UpdateOrganizationComponent } from './pages/organization-configuration/update-organization/update-organization.component';
import { BalanceScoreCardComponent } from './pages/perfomance-management-module/balance-score-card/balance-score-card.component';
import { IndividualScoreCardComponent } from './pages/perfomance-management-module/balance-score-card/individual-score-card/individual-score-card.component';
import { EmployeeAssessmentComponent } from './pages/perfomance-management-module/evaluation/employee-assessment/employee-assessment.component';
import { SetGoalComponent } from './pages/perfomance-management-module/evaluation/employee-assessment/set-goal/set-goal.component';
import { EvaluationComponent } from './pages/perfomance-management-module/evaluation/evaluation.component';
import { GoalComponent } from './pages/perfomance-management-module/evaluation/goal/goal.component';
import { ReviewComponent } from './pages/perfomance-management-module/evaluation/goal/review/review.component';
import { PerfomanceManagementModuleComponent } from './pages/perfomance-management-module/perfomance-management-module.component';
import { CreateParameterComponent } from './pages/perfomance-management-module/perfomance-parameters/create-parameter/create-parameter.component';
import { PerfomanceParametersComponent } from './pages/perfomance-management-module/perfomance-parameters/perfomance-parameters.component';
import { UpdateParameterComponent } from './pages/perfomance-management-module/perfomance-parameters/update-parameter/update-parameter.component';
import { ResignationModuleComponent } from './pages/resignation-module/resignation-module.component';
import { ResignationPayrollComponent } from './pages/resignation-module/resignation-payroll/resignation-payroll.component';
import { BankTransferComponent } from './pages/salary-module/bank-transfer/bank-transfer.component';
import { EmployeePayslipsComponent } from './pages/salary-module/employee-payslips/employee-payslips.component';
import { KraReturnsComponent } from './pages/salary-module/kra-returns/kra-returns.component';
import { NhifReturnsComponent } from './pages/salary-module/nhif-returns/nhif-returns.component';
import { NssfReturnsComponent } from './pages/salary-module/nssf-returns/nssf-returns.component';
import { GenerateP9formComponent } from './pages/salary-module/p9form-component/generate-p9form/generate-p9form.component';
import { P9formComponentComponent } from './pages/salary-module/p9form-component/p9form-component.component';
import { CreateCustPayrollComponent } from './pages/salary-module/payroll-generation/create-cust-payroll/create-cust-payroll.component';
import { PayrollGenerationComponent } from './pages/salary-module/payroll-generation/payroll-generation.component';
import { UpdateCustPayrollComponent } from './pages/salary-module/payroll-generation/update-cust-payroll/update-cust-payroll.component';
import { PendingPayrollComponent } from './pages/salary-module/pending-payroll/pending-payroll.component';
import { UpdateBasicSalaryComponent } from './pages/salary-module/pending-payroll/update-basic-salary/update-basic-salary.component';
import { SalaryModuleComponent } from './pages/salary-module/salary-module.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { PayrollMainPageComponent } from './pages/salary-module/payroll-generation/payroll-main-page/payroll-main-page.component';
import { ViewSwiftsComponent } from './pages/swift/view-swifts/view-swifts.component';
import { CreateSwiftComponent } from './pages/swift/create-swift/create-swift.component';
import { UpdateSwiftComponent } from './pages/swift/update-swift/update-swift.component';
import { ViewGeneatedPayrollComponent } from './pages/salary-module/payroll-generation/view-geneated-payroll/view-geneated-payroll.component';

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'swifts',
      component: ViewSwiftsComponent,
    },
    {
      path: 'create-swift',
      component: CreateSwiftComponent,
    },
    {
      path: 'update-swift',
      component: UpdateSwiftComponent
    },
    {
      path: 'configurations',
      component:OrganizationConfigurationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/nhif',
      component: NhifConfigurationsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/nhif/add',
      component: AddTaxBandComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/nhif/update/:id',
      component: UpdateTaxBandComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/nssf',
      component: NssfConfigurationsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/nssf/add',
      component: AddNssfComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/nssf/update/:id',
      component: UpdateNssfComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/kra',
      component: KraConfigurationsComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/kra/add',
      component:  CreateKraComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/kra/update/:id',
      component:  UpdateKraComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/create',
      component:CreateOrganizationComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/update',
      component:UpdateOrganizationComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/set/absentism',
      component:AbsentismConfigComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/set/email',
      component:EmailsConfigurationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/set/email/add',
      component:AddEmailConfigurationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/set/email/preview/:id',
      component:PreviewEmailComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'configurations/set/email/update/:id',
      component:UpdateEmailConfigurationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'configurations/batch',
      component: BatchProcessesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'departments',
      component:DepartmentsManagementComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'create/new/department',
      component:CreateDepartmentComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'update/department/:id',
      component:UpdateDepartmentComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },


    {
      path: 'employee/departments/:id',
      component: DepartmentEmployeesComponent
    },
    {
      path:'create/new/employee',
      component: CreateEmployeeComponent,
      //canActivate: [ AuthGuard ],
      //data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees',
      component: EmployeesManagementComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees/promotions',
      component: PromotionsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employees/active',
      component: ActiveEmployeesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees/inactive',
      component: InactiveEmployeesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employees/trashed',
      component: TrashedEmployeesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees/bank_transfer',
      component:BankTransferComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees/kra_returns',
      component: KraReturnsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employees/nhif_returns',
      component: NhifReturnsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employees/nssf_returns',
      component: NssfReturnsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employees/p9form',
      component: P9formComponentComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employees/generate/yearly/p9form/',
      component: GenerateP9formComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'accounts',
      component:AccountManagementComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
     {
      path: 'all/pending/employees/accounts',
      component:PendingAccountsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'all/approved/employees/accounts',
      component:ApprovedAccountsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'all/revoked/employees/accounts',
      component:RevokedAccountsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },


    {
      path: 'update/role/employee/:email',
      component: UpdateRoleComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'update/role/employee/:email',
      component: UpdateRoleComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/detail/:id',
      component: EmployeeDetailComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/update/education/:id',
      component: UpdateEducationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/update/experience/:id',
      component: UpdateExperienceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/hold/:id',
      component:HoldEmployeeComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }

    },
    {
      path: 'employee/update/:id',
      component: UpdateEmployeeComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/promote/:id',
      component: PromoteEmployeeComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'payroll/home',
      component: PayrollMainPageComponent,
      data: {}
    },
    {
      path: 'payroll/generaton',
      component: PayrollGenerationComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'payroll/user/generation',
      component: CreateCustPayrollComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'payroll/user/generation/update/:id',
      component: UpdateCustPayrollComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'salary',
      component: SalaryModuleComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/basic-salary/update/:id',
      component:UpdateBasicSalaryComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'salary/employee/payslip',
      component: EmployeePayslipsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/salary/:id',
      component: EmployeeSalaryComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'leaves/type/update/:id',
      component: UpdateLeaveTypeComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'leaves/type',
      component: LeaveTypeComponentComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'my/leave/requests',
      component: MyLeaveRequestsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'leaves',
      component: LeavesManagementComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'leaves/inactive',
      component: InactiveEmployeeLeavesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    // administrations
    {
      path: 'apply/leave',
      component: ApplyLeaveComponent ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    // update Leave


    {
      path: 'create/leave',
      component: CreateLeaveTypeComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'leaves/request/update/:id',
      component: LeaveRequestUpdateComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    // employee component
    // ************************** Salary Component ******************/
    {
      path: 'unapproved/employees',
      component: PendingEmployeesComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    
    {
      path: 'employee/salary/payroll-details/:id',
      component: ViewGeneatedPayrollComponent
    },

    {
      path: 'pending/salary',
      component: PendingPayrollComponent
      ,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/advance/salary/params',
      component: AdvanceSalaryParamsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/advance/salary/params/create',
      component:  CreateAdvanceParameterComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/advance/salary/params/update',
      component:  UpdateAdvanceParameterComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/advance/salary/apply',
      component: ApplyAdvanceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/advance/salary',
      component: AdvanceSalaryComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    // {
    //   path: 'employee/advance/salary',
    //   component: AdvanceSalaryComponent,
    //   canActivate: [ AuthGuard ],
    //   data: {roles: [Role.Administration_privilege], preload:true }
    // },
    {
      path: 'resignation',
      component: ResignationModuleComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'resignation/payroll',
      component: ResignationPayrollComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management',
      component: PerfomanceManagementModuleComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/parameters/create',
      component: CreateParameterComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/parameters/update/:id',
      component: UpdateParameterComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },


    {
      path: 'employee/perfomance/management/parameters',
      component: PerfomanceParametersComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/evaluation',
      component: EvaluationComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/evaluation/goals/:id',
      component: GoalComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/evaluation/goals/review/:id',
      component: ReviewComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/perfomance/management/evaluation/set/goal',
      component: SetGoalComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/evaluation/assessment/:id',
      component: EmployeeAssessmentComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/balance/score/card',
      component: BalanceScoreCardComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/perfomance/management/balance/score/card/individual/analysis/:id',
      component: IndividualScoreCardComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/allowances',
      component: AllowancesComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/allowances/add',
      component: AddCustomAllowanceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/allowances/update/:id',
      component: UpdateCustomAllowanceComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    ///allowance benefits
    {
      path: 'employee/allowance-benefits/add',
      component: AddallowancebenefitsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/allowance-benefits/update/:id',
      component: UpdateallowancebenefitsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/allowance-benefits/view',
      component: ManageallowancebenefitsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'employee/timesheet',
      component:  TimeSheetComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },  {
      path: 'employee/attendance',
      component: AttendanceManagementComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/attendance/configurations',
      component: AttendanceConfigurationsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },
    {
      path: 'employee/attendance/holiday/configurations',
      component: HolidayConfigurationsComponent,
      // canActivate: [ AuthGuard ],
      // data: {roles: [Role.Administration_privilege], preload:true }
    },

    {
      path: 'profile',
      component: UserProfileComponent,
      canActivate: [ AuthGuard ],
      data: {roles: [Role.Administration_privilege], preload:true }
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
