import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryGenerationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/payroll/salary/generate`;
    constructor(private http: HttpClient) { }
  // Add
    // Batch Processes
    generatePayroll(): Observable<any> {
      let API_URL = `${this.baseURL}/Generate_Payroll/`;
      return this.http.post(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    sentPayrollReporttoDirector(): Observable<any> {
      let API_URL = `${this.baseURL}/Sent_Payroll_Report_to_Director/`;
      return this.http.post(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  
    approveandCommitPayroll(): Observable<any> {
      let API_URL = `${this.baseURL}/Approve_and_Commit Payroll/`;
      return this.http.post(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    generatePayrollReportandPayslips(): Observable<any> {
      let API_URL = `${this.baseURL}/Generate_Payroll_Report_and_Payslips/`;
      return this.http.post(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
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
