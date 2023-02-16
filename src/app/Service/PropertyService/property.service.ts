
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Property } from 'src/@core/Models/property/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');





    // API endpoint
  baseURL = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

  // Add
  createProperty(data: Property): Observable<any> {
    console.log("Data Service", data);
    let API_URL = `${this.baseURL}/property/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        console.log("THis respond", res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getProperties() {
    let API_URL = `${this.baseURL}/property/all`;
    return this.http.get(API_URL, { withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get by id
  getPropertyId(id: any): Observable<any> {
    console.log('id is', id);
    let API_URL = `${this.baseURL}/property/all/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {

          console.log("the data is", res)
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updateProperty(id: string | null, data: any): Observable<any> {
    return this.http.put(this.baseURL, data, { headers: this.headers } )
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Delete Property
  deleteProperty(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/property/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    console.log("got this", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log("client side error:",errorMessage );
      console.log("client side error:",error );
      console.log("client side error:",error.error );
      console.log("client side error:",error.error.message );
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("server side error:",errorMessage );
      console.log("server side error:",error );
      console.log("server side error:",error.error );
      console.log("server side error:",error.error.message );
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
