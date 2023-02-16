import { Leave } from '../../../@core/Models/Leave/leave.model';
import { Employee } from '../../../@core/Models/Employee/employee.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // API endpoint
  baseURL = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }
  // Add
  createEmployeeLeave(data: Leave): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }

  generateDocumentReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };

    let API_URL = `${this.baseURL}/pdf/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          filename: 'dailyOrdersReport.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }

  generatePayslip(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/payslip/${id}`;
    console.log(API_URL);
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          filename: 'payslip.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }

  generateAnnualDepartmentReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/department/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          filename: 'Department_Annual_Report.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }
  generateMonthlyDepartmentReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/department/monthly/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          filename: 'Department_Monthly_Report.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }
  generateP9form(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/p9form/${id}`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          filename: 'Employee_P9_Form.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }

  generateYearlyP9form(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/yearly/p9form/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        console.log("hey respond file", response);
        return {
          filename: 'Employee_P9_Form.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }


  generateEmployeeP9form(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/employee/p9form/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        console.log("hey respond file", response);
        return {
          filename: 'Employee_P9_Form.pdf',
          data: new Blob([response], { type: 'application/pdf' })
        };
      }));
  }



  getExcel(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${this.baseURL}/api/v1/reports/banktransfer/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          responseType: 'blob'
        };
      }));
  }


  getFile(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    const httpOptions = {
      // 'responseType'  : 'arraybuffer' as 'json'
      'responseType': 'blob' as 'json'        //This also worked
    };

    let API_URL = `${this.baseURL}/api/v1/documents/downloadFile/${id}`;
    return this.http.get(API_URL, httpOptions);
  }
  getDowload(url: any): Observable<any> {
    const httpOptions = {
      'responseType': 'blob' as 'json'        //This also worked
    };
    return this.http.get(url, httpOptions);
  }



  // download(filename: string): Observable<HttpEvent<Blob>> {
  //   return this.http.get(`${this.server}/file/download/${filename}/`, {
  //     reportProgress: true,
  //     observe: 'events',
  //     responseType: 'blob'
  //   });

  // Get all
  getEmployeesLeaves() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getEmployeesReport() {
    let API_URL = `${this.baseURL}pdf`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Get by id
  getEmployeeLeaveId(id: any): Observable<any> {
    let API_URL = `he/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
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

  // updateEmployeeLeave(data: Leave): Observable<any> {
  //   let API_URL = `${this.baseURL}/update/`;
  //   return this.http.put(API_URL, { withCredentials: false })
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }
  // Add
  updateEmployeeLeave(id: any, data: Leave): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  directorUpdateEmployeeLeave(id: any, data: Leave): Observable<any> {
    let API_URL = `${this.baseURL}/director/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }

  // Delete Property
  deleteEmployeeLeave(id: any): Observable<any> {
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
