import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/perfomance/management/goal/reviews`;
    constructor(private http: HttpClient) { }
  // Add
  createReview(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getReviews() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getBestRanking() {
    let API_URL = `${this.baseURL}/best/employee`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getReviewsRanking() {
    let API_URL = `${this.baseURL}/rank/all/employees`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  

  getTop3Employees() {
    let API_URL = `${this.baseURL}/top/3/employees`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getLast3Employees() {
    let API_URL = `${this.baseURL}/last/3/employees`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getByEmployeeId(employee_id: any) {
    let API_URL = `${this.baseURL}/find/review/by/employee/${employee_id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getAvgReviewByEmployeeId(employee_id: any) {
    let API_URL = `${this.baseURL}/find/avg/review/by/employee/${employee_id}`;
    console.log(API_URL);
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false})
    .pipe(
      map((res) => {
        console.log(`result from ${API_URL}`);
        console.log(res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getSumByEmployeeId(employee_id: any) {
    let API_URL = `${this.baseURL}/find/sum/by/employee/${employee_id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  

  

  countAllEmployees() {
    let API_URL = `${this.baseURL}/count/all/goals`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

    // Get all by employee id
    getReviewsByEmployeeId(employee_id: any) {
      let API_URL = `${this.baseURL}/find/by/employee/${employee_id}`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

        // Get all by employee id
        getAverageReviewsByEmployeeId(employee_id: any) {
          let API_URL = `${this.baseURL}/find/average/by/employee/${employee_id}`;
          return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }

        getReviewsByParameterandEmployeeId(params: any) {
          let API_URL = `${this.baseURL}/find/pm_review/by/parameter/and/employee/`;
          return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }

        getEmployeeMonthlyAvgReviewPerYear(params: any) {
          let API_URL = `${this.baseURL}/find/review/yearly/by/employee/`;
          return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }

        getMonthlyAvgReviewPerYear(params: any) {
          let API_URL = `${this.baseURL}/find/organization/avg/review/perfomance/per/year`;
          return this.http.get(API_URL, { params:params, headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }
          getTotalReviewsPerYear() {
          let API_URL = `${this.baseURL}/group/organization/review/per/year`;
          return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
          .pipe(
            map((res) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
        }
        

    
        

  
    // Get by id
    getReviewDetailId(Review_id: any): Observable<any> {
      let API_URL = `${this.baseURL}/find/detail/by/Review/${Review_id}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
         // Get by id
         getLastReviewBygoalId(params: any): Observable<any> {
          let API_URL = `${this.baseURL}/find/last/review/by/employeeid/and/goalid/`;
          return this.http.get(API_URL, { params: params, withCredentials: false })
            .pipe(
              map((res) => {
                return res || {}
              }),
              catchError(this.errorMgmt)
            )
        }
  

  updateReview(id: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteReview(id: any): Observable<any> {
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
