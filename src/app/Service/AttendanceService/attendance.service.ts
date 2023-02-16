import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/attendance`;
    constructor(private http: HttpClient) { }
  // Add /api/v1/attendance/find/todays/attendance
  createAttendance(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getAttendances() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getTodaysAttendances() {
    let API_URL = `${this.baseURL}/find/todays/attendance`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getAllFilteredByAttendancesStatus(params:any) {
    let API_URL = `${this.baseURL}/find/all/attendance/filtered/by/`;
    return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Get all detailed
    getAttendancesDetailed() {
      let API_URL = `${this.baseURL}/all/detailed`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
        // Get all detailed
        getAttendancesDetailedPerDepartment(params:any) {
          console.log("detailed params",params);
          
          let API_URL = `${this.baseURL}/all/detailed/per/department`;
          return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }
    
  
  // Get by id
  getAttendanceId(id: any): Observable<any> {
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
  getAttendanceEmployeeId(params:any): Observable<any> {
      let API_URL = `${this.baseURL}/find/employee/attendance`;
      return this.http.get(API_URL, { params:params, withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  updateAttendance(id: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  checkIn(id:any): Observable<any> {
    let API_URL = `${this.baseURL}/sign/in/by/attendance/${id}`;
    return this.http.put(API_URL,{headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  checkOut(id:any): Observable<any> {
    let API_URL = `${this.baseURL}/sign/out/by/attendance/${id}`;
    return this.http.put(API_URL,{headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getRegister(): Observable<any> {    
    let API_URL = `${this.baseURL}/register`;
    return this.http.get(API_URL,{headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  

  deleteAttendance(id: any): Observable<any> {
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
