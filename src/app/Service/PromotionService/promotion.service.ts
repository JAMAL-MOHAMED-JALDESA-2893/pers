import { Promotion } from '../../../@core/Models/Promotion/Promotion.model';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/promotions`;
    constructor(private http: HttpClient) { }
  // Add
  createPromotion(data: Promotion): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getPromotions() {
    let API_URL = `${this.baseURL}/all/data`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Get all
    getPromotionsPerStatus(params:any) {
      let API_URL = `${this.baseURL}/all/data/per/status`;
      return this.http.get(API_URL, {params:params, headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  
  // Get by id
  getPromotionId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
    updatePromotion(id: any, data: Promotion): Observable<any> {
      let API_URL = `${this.baseURL}/update/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  trashPromotion(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/trash/${id}`;
    return this.http.put(API_URL,{}, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Delete Property
  deletePromotion(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.put(API_URL,{}, { withCredentials: false })
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
