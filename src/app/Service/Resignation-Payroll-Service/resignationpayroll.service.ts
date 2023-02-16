import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResignationpayrollService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/resignation`;
    constructor(private http: HttpClient) { }

  
      // Get all
      getResignationSalary() {
        let API_URL = `${this.baseURL}/all/detailed`;
        return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
      }

      payEmployee(id: any): Observable<any> {
        let API_URL = `${this.baseURL}/pay/${id}`;
        return this.http.put(API_URL, {headers: this.headers, withCredentials: false})
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
