import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { authInterceptorProviders } from 'src/app/Auth/helpers/auth.interceptor';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateDepartmentComponent } from './pages/departments-management/create-department/create-department.component';
import { DepartmentDetailsComponent } from './pages/departments-management/department-details/department-details.component';
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
import { NewEmployeesComponent } from './pages/employees-management/new-employees/new-employees.component';
import { PendingEmployeesComponent } from './pages/employees-management/pending-employees/pending-employees.component';
import { PromoteEmployeeComponent } from './pages/employees-management/promote-employee/promote-employee.component';
import { PromotionsComponent } from './pages/employees-management/promotions/promotions.component';
import { TrashedEmployeesComponent } from './pages/employees-management/trashed-employees/trashed-employees.component';
import { UpdateEducationComponent } from './pages/employees-management/update-employee/update-education/update-education.component';
import { UpdateEmployeeComponent } from './pages/employees-management/update-employee/update-employee.component';
import { UpdateExperienceComponent } from './pages/employees-management/update-employee/update-experience/update-experience.component';
import { LeaveTypeComponentComponent } from './pages/leave-type-component/leave-type-component.component';
import { CreateLeaveTypeComponent } from './pages/leaves-management/create-leave-type/create-leave-type.component';
import { LeaveRequestUpdateComponent } from './pages/leaves-management/leave-request-update/leave-request-update.component';
import { LeavesManagementComponent } from './pages/leaves-management/leaves-management.component';
import { CreateOrganizationComponent } from './pages/organization-configuration/create-organization/create-organization.component';
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
import { ViewOrganizationComponent } from './pages/organization-configuration/view-organization/view-organization.component';
import { EmployeeAssessmentComponent } from './pages/perfomance-management-module/evaluation/employee-assessment/employee-assessment.component';
import { EvaluationComponent } from './pages/perfomance-management-module/evaluation/evaluation.component';
import { PerfomanceManagementModuleComponent } from './pages/perfomance-management-module/perfomance-management-module.component';
import { CreateParameterComponent } from './pages/perfomance-management-module/perfomance-parameters/create-parameter/create-parameter.component';
import { PerfomanceParametersComponent } from './pages/perfomance-management-module/perfomance-parameters/perfomance-parameters.component';
import { UpdateParameterComponent } from './pages/perfomance-management-module/perfomance-parameters/update-parameter/update-parameter.component';
import { ResignationModuleComponent } from './pages/resignation-module/resignation-module.component';
import { BankTransferComponent } from './pages/salary-module/bank-transfer/bank-transfer.component';
import { EmployeePayslipsComponent } from './pages/salary-module/employee-payslips/employee-payslips.component';
import { KraReturnsComponent } from './pages/salary-module/kra-returns/kra-returns.component';
import { NhifReturnsComponent } from './pages/salary-module/nhif-returns/nhif-returns.component';
import { NssfReturnsComponent } from './pages/salary-module/nssf-returns/nssf-returns.component';
import { GenerateP9formComponent } from './pages/salary-module/p9form-component/generate-p9form/generate-p9form.component';
import { PendingPayrollComponent } from './pages/salary-module/pending-payroll/pending-payroll.component';
import { UpdateBasicSalaryComponent } from './pages/salary-module/pending-payroll/update-basic-salary/update-basic-salary.component';
import { SalaryModuleComponent } from './pages/salary-module/salary-module.component';
import { InfoCardsComponent } from './shared/info-cards/info-cards.component';
import { SetGoalComponent } from './pages/perfomance-management-module/evaluation/employee-assessment/set-goal/set-goal.component';
import { EvaluateEmployeeComponent } from './pages/perfomance-management-module/evaluation/evaluate-employee/evaluate-employee.component';
import { GoalComponent } from './pages/perfomance-management-module/evaluation/goal/goal.component';
import { ReviewComponent } from './pages/perfomance-management-module/evaluation/goal/review/review.component';
import { CommentComponent } from './pages/perfomance-management-module/evaluation/goal/comment/comment.component';
import { ReplyComponent } from './pages/perfomance-management-module/evaluation/goal/reply/reply.component';
import { SubReplyComponent } from './pages/perfomance-management-module/evaluation/goal/sub-reply/sub-reply.component';
import { SetgoalComponent } from './pages/perfomance-management-module/evaluation/goal/setgoal/setgoal.component';
import { UpdategoalComponent } from './pages/perfomance-management-module/evaluation/goal/updategoal/updategoal.component';
import { SetreviewComponent } from './pages/perfomance-management-module/evaluation/goal/review/setreview/setreview.component';
import { BalanceScoreCardComponent } from './pages/perfomance-management-module/balance-score-card/balance-score-card.component';
import { AbsentismComponentComponent } from './pages/absentism-component/absentism-component.component';
import { AbsentismConfigComponent } from './pages/absentism-component/absentism-config/absentism-config.component';
import { AddAbsentismComponent } from './pages/absentism-component/absentism-config/add-absentism/add-absentism.component';
import { UpdateAbsentismComponent } from './pages/absentism-component/absentism-config/update-absentism/update-absentism.component';
import { EmailsConfigurationComponent } from './pages/organization-configuration/emails-configuration/emails-configuration.component';
import { AddEmailConfigurationComponent } from './pages/organization-configuration/emails-configuration/add-email-configuration/add-email-configuration.component';
import { UpdateEmailConfigurationComponent } from './pages/organization-configuration/emails-configuration/update-email-configuration/update-email-configuration.component';
import { PreviewEmailComponent } from './pages/organization-configuration/emails-configuration/preview-email/preview-email.component';
import { SupervisorDashboardComponent } from './pages/dashboard/supervisor-dashboard/supervisor-dashboard.component';
import { IndividualScoreCardComponent } from './pages/perfomance-management-module/balance-score-card/individual-score-card/individual-score-card.component';
import { BatchProcessesComponent } from './pages/organization-configuration/batch-processes/batch-processes.component';
import { AddBatchComponent } from './pages/organization-configuration/batch-processes/add-batch/add-batch.component';
import { UpdateBatchComponent } from './pages/organization-configuration/batch-processes/update-batch/update-batch.component';
import { AllowancesComponent } from './pages/allowances/allowances.component';
import { AddCustomAllowanceComponent } from './pages/allowances/add-custom-allowance/add-custom-allowance.component';
import { UpdateCustomAllowanceComponent } from './pages/allowances/update-custom-allowance/update-custom-allowance.component';
import { ReviewAllowanceComponent } from './pages/allowances/review-allowance/review-allowance.component';
import { AttendanceManagementComponent } from './pages/attendance-management/attendance-management.component';
import { HolidayConfigurationsComponent } from './pages/attendance-management/holiday-configurations/holiday-configurations.component';
import { AttendanceConfigurationsComponent } from './pages/attendance-management/attendance-configurations/attendance-configurations.component';
import { AddHolidayComponent } from './pages/attendance-management/holiday-configurations/add-holiday/add-holiday.component';
import { UpdateHolidayComponent } from './pages/attendance-management/holiday-configurations/update-holiday/update-holiday.component';
import { AddAttendanceConfigurationsComponent } from './pages/attendance-management/attendance-configurations/add-attendance-configurations/add-attendance-configurations.component';
import { UpdateAttendanceConfigurationsComponent } from './pages/attendance-management/attendance-configurations/update-attendance-configurations/update-attendance-configurations.component';
import { TimeSheetComponent } from './pages/attendance-management/time-sheet/time-sheet.component';
import { PayrollGenerationComponent } from './pages/salary-module/payroll-generation/payroll-generation.component';
import { ResignationPayrollComponent } from './pages/resignation-module/resignation-payroll/resignation-payroll.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { UpdateLeaveTypeComponent } from './pages/leave-type-component/update-leave-type/update-leave-type.component';
import { InactiveEmployeeLeavesComponent } from './pages/leaves-management/inactive-employee-leaves/inactive-employee-leaves.component';
import { ApplyLeaveComponent } from './pages/leaves-management/apply-leave/apply-leave.component';
import { UpdateMyLeaveComponent } from './pages/leaves-management/update-my-leave/update-my-leave.component';
import { MyLeaveRequestsComponent } from './pages/leaves-management/my-leave-requests/my-leave-requests.component';
import { GeneratedPayrollComponent } from './pages/salary-module/payroll-generation/generated-payroll/generated-payroll.component';
import { PayrollReportEmailsComponent } from './pages/salary-module/payroll-generation/payroll-report-emails/payroll-report-emails.component';
import { CreateCustPayrollComponent } from './pages/salary-module/payroll-generation/create-cust-payroll/create-cust-payroll.component';
import { UpdateCustPayrollComponent } from './pages/salary-module/payroll-generation/update-cust-payroll/update-cust-payroll.component';
import { P9formComponentComponent } from './pages/salary-module/p9form-component/p9form-component.component';
import { EmployeeLookupComponent } from './pages/salary-module/payroll-generation/employee-lookup/employee-lookup.component';
import { GrossSummaryChartComponent } from './pages/dashboard/Widgets/gross-summary-chart/gross-summary-chart.component';
import { EmployeeChartComponent } from './pages/dashboard/Widgets/employee-chart/employee-chart.component';
import { AddallowancebenefitsComponent } from './pages/allowances/allowancebenefits/addallowancebenefits/addallowancebenefits.component';
import { ManageallowancebenefitsComponent } from './pages/allowances/allowancebenefits/manageallowancebenefits/manageallowancebenefits.component';
import { ReviewallowancebenefitsComponent } from './pages/allowances/allowancebenefits/reviewallowancebenefits/reviewallowancebenefits.component';
import { UpdateallowancebenefitsComponent } from './pages/allowances/allowancebenefits/updateallowancebenefits/updateallowancebenefits.component';
import { RejectbenefitsDialogComponent } from './pages/allowances/allowancebenefits/rejectbenefits-dialog/rejectbenefits-dialog.component';
import { PayrollMainPageComponent } from './pages/salary-module/payroll-generation/payroll-main-page/payroll-main-page.component';
import { CreateSwiftComponent } from './pages/swift/create-swift/create-swift.component';
import { UpdateSwiftComponent } from './pages/swift/update-swift/update-swift.component';
import { ViewSwiftsComponent } from './pages/swift/view-swifts/view-swifts.component';
import { ViewGeneatedPayrollComponent } from './pages/salary-module/payroll-generation/view-geneated-payroll/view-geneated-payroll.component';
import { LeaveApprovalComponent } from './pages/leaves-management/leave-request-update/leave-approval/leave-approval.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InfoCardsComponent,
    DashboardComponent,
    EmployeesManagementComponent,
    CreateEmployeeComponent,
    EmployeeDetailComponent,
    UpdateEmployeeComponent,
    EmployeeSalaryComponent,
    SalaryModuleComponent,
    LeavesManagementComponent,
    LeaveRequestUpdateComponent,
    DepartmentsManagementComponent,
    CreateDepartmentComponent,
    UpdateDepartmentComponent,
    DepartmentDetailsComponent,
    DepartmentEmployeesComponent,
    CreateLeaveTypeComponent,
    LeaveTypeComponentComponent,
    AccountManagementComponent,
    HoldEmployeeComponent,
    OrganizationConfigurationComponent,
    CreateOrganizationComponent,
    ViewOrganizationComponent,
    UpdateOrganizationComponent,
    ActiveEmployeesComponent,
    InactiveEmployeesComponent,
    TrashedEmployeesComponent,
    PromoteEmployeeComponent,
    KraReturnsComponent,
    NhifReturnsComponent,
    NssfReturnsComponent,
    BankTransferComponent,
    PromotionsComponent,
    EmployeePayslipsComponent,
    P9formComponentComponent,
    UpdateEducationComponent,
    UpdateExperienceComponent,
    KraConfigurationsComponent,
    CreateKraComponent,
    UpdateRoleComponent,
    NhifConfigurationsComponent,
    AddTaxBandComponent,
    UpdateTaxBandComponent,
    NssfConfigurationsComponent,
    AddNssfComponent,
    UpdateNssfComponent,
    GenerateP9formComponent,
    UpdateKraComponent,
    NewEmployeesComponent,
    PendingEmployeesComponent,
    PendingPayrollComponent,
    ResignationModuleComponent,
    PendingAccountsComponent,
    ApprovedAccountsComponent,
    RevokedAccountsComponent,
    UpdateBasicSalaryComponent,
    PerfomanceManagementModuleComponent,
    PerfomanceParametersComponent,
    CreateParameterComponent,
    UpdateParameterComponent,
    AdvanceSalaryComponent,
    AdvanceSalaryParamsComponent,
    UpdateAdvanceParameterComponent,
    CreateAdvanceParameterComponent,
    ApplyAdvanceComponent,
    EvaluationComponent,
    EmployeeAssessmentComponent,
    SetGoalComponent,
    EvaluateEmployeeComponent,
    GoalComponent,
    ReviewComponent,
    CommentComponent,
    ReplyComponent,
    SubReplyComponent,
    SetgoalComponent,
    UpdategoalComponent,
    SetreviewComponent,
    BalanceScoreCardComponent,
    AbsentismComponentComponent,
    AbsentismConfigComponent,
    AddAbsentismComponent,
    UpdateAbsentismComponent,
    EmailsConfigurationComponent,
    AddEmailConfigurationComponent,
    UpdateEmailConfigurationComponent,
    PreviewEmailComponent,
    SupervisorDashboardComponent,
    IndividualScoreCardComponent,
    BatchProcessesComponent,
    AddBatchComponent,
    UpdateBatchComponent,
    AllowancesComponent,
    AddCustomAllowanceComponent,
    UpdateCustomAllowanceComponent,
    ReviewAllowanceComponent,
    AttendanceManagementComponent,
    HolidayConfigurationsComponent,
    AttendanceConfigurationsComponent,
    AddHolidayComponent,
    UpdateHolidayComponent,
    AddAttendanceConfigurationsComponent,
    UpdateAttendanceConfigurationsComponent,
    TimeSheetComponent,
    PayrollGenerationComponent,
    ResignationPayrollComponent,
    UserProfileComponent,
    UpdateLeaveTypeComponent,
    InactiveEmployeeLeavesComponent,
    ApplyLeaveComponent,
    UpdateMyLeaveComponent,
    MyLeaveRequestsComponent,
    GeneratedPayrollComponent,
    PayrollReportEmailsComponent,
    UpdateCustPayrollComponent,
    CreateCustPayrollComponent,
    EmployeeLookupComponent,
    GrossSummaryChartComponent,
    EmployeeChartComponent,
    AddallowancebenefitsComponent,
    ManageallowancebenefitsComponent,
    ReviewallowancebenefitsComponent,
    UpdateallowancebenefitsComponent,
    RejectbenefitsDialogComponent,
    PayrollMainPageComponent,
    CreateSwiftComponent,
    UpdateSwiftComponent,
    ViewSwiftsComponent,
    ViewGeneatedPayrollComponent,
    LeaveApprovalComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
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
  providers: [authInterceptorProviders],
})
export class AdministrationModule { }
