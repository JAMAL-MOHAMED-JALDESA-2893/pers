import { identity, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomBenefitsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL = `${environment.apiUrl}/api/v1/benefit/custom`;

  constructor(private http: HttpClient) { }

  //Add
  create(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => {
      return res || {}
    }), catchError(this.errorMgmt))
  }
  read(): Observable<any> {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => {
      return res || {}
    }), catchError(this.errorMgmt))
  }
  // readAll(reviewStatus: any): Observable<any> {
  //   let API_URL = `${this.baseURL}/${reviewStatus}`;
  //   return this.http.get(API_URL, {
  //     headers: this.headers, withCredentials: false
  //   }).pipe(map(res => {
  //     return res || {}
  //   }), catchError(this.errorMgmt))
  // }

  find(id: number): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http
      .get(API_URL, {
        headers: this.headers,
        withCredentials: false,
      })
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  updateBenefits(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL,data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  //update
  update(data: any, id: any): Observable<any> {
    let API_URL = `${this.baseURL}/update`;
    return this.http.put<any>(API_URL, data, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => res || {}),
      catchError(this.errorMgmt))
  }
  //update by passing poarams
  updateBYParams(params: any) {
    let API_URL = `${this.baseURL}`;
    return this.http
      .put(API_URL, {}, { params, }
      ).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  
  directorApprove(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/approve/by/director/${id}`;
    return this.http.put(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // directorReject(id: any, data: any): Observable<any> {
  //   console.log("data from employee", data)
  //   let API_URL = `${this.baseURL}/reject/by/director/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false })
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }
  directorReject(params: any) {
    let API_URL = `${this.baseURL}/reject/by/director`;
    return this.http
      .put(API_URL, {}, { params, }
      ).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  //Delete 
  delete(id: number): Observable<any> {
    let API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => res || {}),
      catchError(this.errorMgmt))
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