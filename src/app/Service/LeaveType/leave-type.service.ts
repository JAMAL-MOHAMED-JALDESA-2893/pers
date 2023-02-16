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
export class LeaveTypeService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/leave`;
    constructor(private http: HttpClient) { }
  // Add
  createLeaveType(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getLeavesTypes() {
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
    getEnabledLeavesTypes() {
      let API_URL = `${this.baseURL}/all/enabled/leave/types`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }



  // Get by id
  getLeaveTypeId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
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
  getAllEmployeeLeaveDetal(): Observable<any> {
    let API_URL = `${this.baseURL}/all/active/employee/leave/detail`;
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
    updateLeaveType(id: any, data:any): Observable<any> {
      let API_URL = `${this.baseURL}/update/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    onDisabledLeaveType(id: any): Observable<any> {
      console.log(id)
      let API_URL = `${this.baseURL}/update/on/disabled/${id}`;
      return this.http.put(API_URL,{ headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    onEnabledLeaveType(id: any): Observable<any> {
      let API_URL = `${this.baseURL}/update/on/enabled/${id}`;
      return this.http.put(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }



  // Delete Property
  deleteLeaveType(id: any): Observable<any> {
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
      errorMessage = `Ooops! ${error.error.message}`;
    }
    return throwError(errorMessage);
  }



}
