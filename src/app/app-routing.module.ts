import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleGuard } from 'src/app/Auth/helpers/Module.guard';
import { Role } from 'src/@core/Models/role/role.model';



const routes: Routes = [
//
  // { path: '', loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule) },
  { path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'Auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    // canLoad: [ModuleGuard],
    // data: {roles: [Role.Administration_privilege], preload:true },
  },
  { path: 'portal', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    // canLoad: [ModuleGuard],
    // data: {roles: [Role.User], preload:true },
  },
{ path: 'applicant', loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantModule) },
{ path: 'vacancies', loadChildren: () => import('./vacancies/vacancies.module').then(m => m.VacanciesModule) }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




