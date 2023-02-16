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
export class LeaveService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/employee/leave`;
    constructor(private http: HttpClient) { }
  // Add  http://localhost:8200/api/v1/leave/add
  

  createEmployeeLeave(data: any): Observable<any> {
    console.log("Data", data)
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getEmployeesLeaves(): Observable<any> {
    
    let API_URL = `http://localhost:8200/api/v1/employee/leave/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      
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
  getAllEmployeeLeaveDetalByStatus(params:any): Observable<any> {
    let API_URL = `${this.baseURL}/all/active/employee/leave/detail/by/status`;
    return this.http.get(API_URL, {params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getAllEmployeeLeaveDetalByStatusAndEmployeeId(params:any): Observable<any> {
    console.log("this params", params);
    
    let API_URL = `${this.baseURL}/all/active/employee/leave/detail/by/employee/and/status`;
    return this.http.get(API_URL, {params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  
  // Get by id
  getEmployeeLeaveId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  getActiveEmployeeLeaveByDepartmentId(department_id: any): Observable<any> {
    console.log("this is data for the employ", department_id)
    let API_URL = `${this.baseURL}/find/active/leaves/by/department/${department_id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getInactiveEmployeeLeaveByDepartmentId(department_id: any): Observable<any> {
    console.log("this is data for the employ", department_id)
    let API_URL = `${this.baseURL}/find/inactive/leaves/by/department/${department_id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

    // Get by id
    getLeavesByEmployeeId(employee_id: any): Observable<any> {
      let API_URL = `${this.baseURL}/find/by/employee/${employee_id}`;
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


    // /employee/update/{id}
    employeeUpdateEmployeeLeave(id: any, data: Leave): Observable<any> {
      let API_URL = `${this.baseURL}/employee/update/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    updateEmployeeLeave(id: any, data: Leave): Observable<any> {
      let API_URL = `${this.baseURL}/update/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    closeEmployeeLeave(id: any, data: Leave): Observable<any> {
      let API_URL = `${this.baseURL}/hr/close/leave/${id}`;
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

    supervisorApproveEmployeeLeave(id: any, data: Leave): Observable<any> {
      let API_URL = `${this.baseURL}/supervisor/approval/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
    hrApproveEmployeeLeave(id: any, data: Leave): Observable<any> {
      let API_URL = `${this.baseURL}/hr/approval/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
   
    directorApproveEmployeeLeave(id: any, data: Leave): Observable<any> {
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
      errorMessage = `Sorry! ${error.error.message}`;
    }
    return throwError(errorMessage);
  }


}
