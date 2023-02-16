import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // API endpoint
  baseURL = `${environment.apiUrl}/api/v2/payroll`;
  constructor(private http: HttpClient) { }
  //message medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
    return this.currentMessage;
  }
  // Add
  createManualpayroll(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/generate/Manual`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  // Add
  createPayroll(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/generate/Manual`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getManualPayrolls() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Get by id
  getManualPayrollId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  updateManualPayroll(id: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteManualPayroll(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getSalaryByYearAndMonth(params: any): Observable<any> {
    let API_URL = `${this.baseURL}/per/year/month`;
    return this.http.get(API_URL, { params: params, headers: this.headers, withCredentials: false }).pipe(map(res => {
      console.log("Hey Responded Data", res);
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getPayrolls() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Get all
  getBasicEMployeesDetails() {
    let API_URL = `${this.baseURL}/basic/details/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  commitEmployeeSalary(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/hr/commit/${id}`;
    return this.http.put(API_URL, {headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  commitedPayRollsPerYear(params: any) {
    let API_URL = `${this.baseURL}/find/per/year/month`;
    return this.http
      .get(API_URL, {params,}
      ) .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  uncommitedPerYear(params: any) {
    let API_URL = `${this.baseURL}/uncommitted/per/year/month`;
    return this.http
      .get(API_URL, {params,}
      ) .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  getUncommittedPayroll() {
    let API_URL = `${this.baseURL}/all/uncommitted`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Get by id
  find(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  approvePayrollId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/approve/by/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updatePayroll(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  
  generatePAYROLL(): Observable<any> {
    let API_URL = `${this.baseURL}/generate/Automatic`;
    return this.http.post(API_URL,{ headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  
  deletePayroll(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
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
