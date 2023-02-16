import { Leave } from '../../../@core/Models/Leave/leave.model';
import { Employee } from '../../../@core/Models/Employee/employee.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Clearence } from 'src/@core/Models/Clearence/clearence.model';

@Injectable({
  providedIn: 'root'
})
export class ClearenceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/clearence`;
    constructor(private http: HttpClient) { }
  // Add
  createClearence(data: any): Observable<any> {
    console.log("Clearence Requests", data);
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // // Get all
  // getAllClearence() {
  //   let API_URL = `${this.baseURL}/all`;
  //   return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
  //   .pipe(
  //     map((res) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }
    // Get all
    getAllClearence() {
      let API_URL = `${this.baseURL}/find/detailed/clearence/all`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

 
  // get Approved Clearence
  getApprovedClearence() {
    let API_URL = `${this.baseURL}/all/approved`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // get Rejected Clearence
  getRejectedClearence() {
    let API_URL = `${this.baseURL}/all/rejected`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get by id
  getClearenceById(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
    // Get by id
    getClearenceByDepartmentId(department_id: any): Observable<any> {
    console.log(department_id)
      let API_URL = `${this.baseURL}/find/detailed/clearence/all/by/department/${department_id}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
    // Get by Employee id
    // getClearenceByEmployeeId(employee_id: any): Observable<any> {
    //   let API_URL = `${this.baseURL}/find/by/employee/${employee_id}`;
    //   return this.http.get(API_URL, { withCredentials: false })
    //     .pipe(
    //       map((res) => {
    //         return res || {}
    //       }),
    //       catchError(this.errorMgmt)
    //     )
    // }
    getClearenceByEmployeeId(employee_id: any): Observable<any> {
      let API_URL = `${this.baseURL}/find/detailed/clearence/${employee_id}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
    
    // update
    updateClearence(id: any, data: any): Observable<any> {
      console.log("Update Requests", data);
      let API_URL = `${this.baseURL}/update/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    // supervisor Approved checked/by/supervisor/{id}
    supervisorCheck(id: any, data: any): Observable<any> {
      let API_URL = `${this.baseURL}/checked/by/supervisor/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    // hr approval
    hrCheck(id: any, data: any): Observable<any> {
      let API_URL = `${this.baseURL}/checked/by/hr/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    // director approvval
    directorCheck(id: any, data: any): Observable<any> {
      let API_URL = `${this.baseURL}/checked/by/director/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
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
