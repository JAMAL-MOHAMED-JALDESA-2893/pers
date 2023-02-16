import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ParametersService } from '../PerfomanceParams/parameters.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/perfomance/management/goals`;
    constructor(private http: HttpClient) { }
  // Add
  createGoal(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getGoals() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Get all by employee id
    getGoalsByEmployeeId(employee_id: any) {
      let API_URL = `${this.baseURL}/all/by/employee/${employee_id}`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

        // Get all by employee id
        getGoalsDetailByEmployeeId(employee_id: any) {
          let API_URL = `${this.baseURL}/detail/all/by/employee/${employee_id}`;
          return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }
  
  // Get by id
  getGoalId(id: any): Observable<any> {
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
    getGoalDetailId(goal_id: any): Observable<any> {
      let API_URL = `${this.baseURL}/find/detail/by/goal/${goal_id}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
   
  

  updateGoal(id: any, data: any): Observable<any> {
    console.log("form id", id);
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteGoal(id: any): Observable<any> {
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
