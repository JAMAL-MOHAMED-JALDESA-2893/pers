import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

params = new HttpParams()
  .set('month', "August");
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v2/payroll/`;
    constructor(private http: HttpClient) { }

    // New Functions
  getSalarySummary(params: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v2/payroll/summary/per/month&year`;
    return this.http.get(API_URL,{params:params, headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getYearSalarySummary(params: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v2/payroll/summary/per/year`;
    return this.http.get(API_URL,{params:params, headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getEmployeeSalarySummary(params: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v2/payroll/employee/summary/per/year`;
    return this.http.get(API_URL,{params:params, headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getPayrollYears(): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v2/payroll/years`;
    return this.http.get(API_URL,{headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // commit/employee/salary/${id}
      // Add
  commitEmployeeSalary(id: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/hr/commit//${id}`;
    return this.http.put(API_URL, {headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  commitAllEmployeeSalary(params: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v1/payroll/commit/all/employee/salary`;
    return this.http.put(API_URL, {}, {params:params, headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getEmployeeLastMonthsSalary(employee_id: any): Observable<any> {
    let API_URL = `${this.baseURL}employee/list/six/months/${employee_id}`;
    return this.http.get(API_URL,{headers: this.headers, withCredentials: false }).pipe(map(res => {
      console.log(API_URL);
      console.log(res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // /salary/detail/per/year/month
  // Add
  getSalaryByYearAndMonth(params: any): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v1/payroll/salary/detail/per/year/month`;
    return this.http.get(API_URL, {params:params, headers: this.headers,withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }



  // Add
  getSalary(): Observable<any> {
    let API_URL = `${this.baseURL}`;
    return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Add
    countPaidEmployees(department_id: any): Observable<any> {
      console.log("hey server",department_id)
      let API_URL = `${environment.apiUrl}/api/v1/payroll/count/paid/department/employees/${department_id}`;
      return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

  getCurrentMonthSalaryDetail(){
    let API_URL = `${environment.apiUrl}/api/v1/payroll/salary/current/month/salary/detail`;
    // let API_URL = `${this.baseURL}`;
    return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // /api/v1/payroll/salary/not/commited
  getUnCommitedSalary(): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v1/payroll/salary/not/commited`;
    return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // api/v1/payroll/yearly/salary
  getMonthlySalary(): Observable<any> {
    let API_URL = `${environment.apiUrl}/api/v1/payroll/yearly/salary`;
    return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // api/v1/payroll/yearly/salary
    getDepartmentMonthlySalary(department_id:any): Observable<any> {
      let API_URL = `${environment.apiUrl}/api/v1/payroll/yearly/salary/by/department/${department_id}`;
      return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }


  // Get all
  getEmployees() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  find(id: number): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http
      .get(API_URL, {
        headers: this.headers,
        withCredentials: false,
      })
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  // Get by id
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

  updateEmployee(id: string | null, data: any): Observable<any> {
    return this.http.put(this.baseURL, data, { headers: this.headers } )
      .pipe(
        catchError(this.errorMgmt)
      )
  }
    // Get by id
    updateBasicSalary(id: any, params: any): Observable<any> {
      let API_URL = `${environment.apiUrl}/api/v1/payroll/update/${id}`;
      return this.http.put(API_URL,{}, { params: params, withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
  }
  

  // Delete Property
  deleteEmployee(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    console.log("got this", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      // console.log("client side error:",errorMessage );
      console.log("client side error:",error );
      // console.log("client side error:",error.error );
      // console.log("client side error:",error.error.message );
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // console.log("server side error:",errorMessage );
      console.log("server side error:",error );
      // console.log("server side error:",error.error );
      // console.log("server side error:",error.error.message );
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
