import { Employee } from '../../../@core/Models/Employee/employee.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/employees`;
  baseURL2: any = 'https://restcountries.com/v3.1/all';
    constructor(private http: HttpClient) { }
  // Add
  createEmployee(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, {headers: this.headers}).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getActiveEmployees() {
    let API_URL = `${this.baseURL}/all/active`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

    // Get Un Approved Employees
    getUnApprovedEmployees() {
      let API_URL = `${this.baseURL}/all/unApproved`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  // Get Active Employees
  // getActiveEmployees() {
  //   let API_URL = `${this.baseURL}/all/active`;
  //   return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
  //   .pipe(
  //     map((res) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }
  getAllEmployees() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Get Active Employees
    filterByEmployeeStatus(params:any) {
      let API_URL = `${this.baseURL}/all/filter/by/employee/status`;
      return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  getUnEnrolledActiveEmployees(){
    let API_URL = `${this.baseURL}/find/evaluation/unenrolled/employees`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get Inactive Employees
  getInactiveEmployees() {
    let API_URL = `${this.baseURL}/all/inactive`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get Trashed Employees
  getTrashedEmployees() {
    let API_URL = `${this.baseURL}/all/trashed`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Diactivate Employee
  diactivateEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/diactivate/employee/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Restore employee
  restoreEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/restore/employee/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Soft Delete Employee /trash/delete/{id}
  trashDeleteEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/trash/delete/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  softDeleteEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/soft/delete/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Parmanent Delete EMployee

  ParmanentDeleteEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/clear/employee/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }



  countEmployees() {
    let API_URL = `${this.baseURL}/count`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  countClosedEmployees() {
    let API_URL = `${this.baseURL}/count/closed/salary`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


  countSalary() {
    let API_URL = `${this.baseURL}/count/salary`;

    let url = `${environment.apiUrl}/api/v1/payroll/count/salary`;



    return this.http.get(url, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  generatePDF() {
    let API_URL = `${this.baseURL}/report/pdf`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getEmployeeId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }


  getEmployeeDetailedId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/employee/detail/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }


  updateEmployee(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/`;
    return this.http.put(API_URL,data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  promoteEmployee(id: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/promote/employee/${id}`;
    return this.http.put(API_URL, data,  { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  deleteEmployee(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getEmployeeEducationId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/education/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  updateEmployeeEducationId(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/education/${id}`;
    return this.http.put(API_URL, data, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  getEmployeeExperienceId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/experience/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  updateEmployeeExperienceId(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/experience/${id}`;
    return this.http.put(API_URL, data, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Slary
  onPayAllEmployees(){
    let API_URL = `${environment.apiUrl}/api/v1/payroll/pay/all`;
    return this.http.post(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
    // Close salary
    onCloseSalary(){
      let API_URL = `${environment.apiUrl}/api/v1/payroll/close/salary/`;
      return this.http.put(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }



// EMPLOYEE MANAGEMENT
// 1. Approve Employee
// get Un Approved

  // Soft Delete Employee
  ApproveEmployee(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/approve/employee/${id}`;
    return this.http.put(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
// 2. Deactivate  Employee
// 3. Activate Employee
// 4. Cleare Employee


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }



}
