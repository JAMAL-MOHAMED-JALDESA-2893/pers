import { Department } from '../../../@core/Models/Department/department.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdvanceSalaryService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
    baseURL = `${environment.apiUrl}/api/v1/salary/advance`
    constructor(private http: HttpClient) { }
  // Add
  createAdvanceSalary(data: Department): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }, err=>{
        console.log(err);
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getAdvanceSalarys() {
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
    getDepartmentAdvanceSalarys(department_id: any) {
      let API_URL = `${this.baseURL}/all/per/department/${department_id}`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  

    // Get all
    getOpenAdvanceSalarys() {
      let API_URL = `${this.baseURL}/all/open/advance/loans`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    

    
    // /api/v1/salary/advance/all/open/advance/loans
  // /find/by/employee/{id}
  // Get by id
  getAdvanceSalaryId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getAdvanceSalaryByEmployeeId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/by/employee/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updateAdvanceSalary(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  onProcessing(id:any): Observable<any> {
    let API_URL = `${this.baseURL}/update/to/processing/by/${id}`;
    return this.http.put(API_URL, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  onApprove(id:any): Observable<any> {
    let API_URL = `${this.baseURL}/update/to/approved/by/${id}`;
    return this.http.put(API_URL,{headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  onDisburse(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/to/disbursement/by/${id}`;
    return this.http.put(API_URL, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  deleteAdvanceSalary(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling
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
