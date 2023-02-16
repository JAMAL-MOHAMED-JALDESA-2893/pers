import { Department } from '../../../@core/Models/Department/department.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  getFiles(): any {
    throw new Error('Method not implemented.');
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/documents`;
  constructor(private http: HttpClient) { }

  onUpload(formData: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseURL}/upload/new`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
    getFile(id: any): Observable<any>{
      let headers = new HttpHeaders();
      headers.append('Accept', 'application/pdf');
      let requestOptions: any = { headers: headers, responseType: 'blob',  withCredentials: false };
      const httpOptions = {
        // 'responseType'  : 'arraybuffer' as 'json'
         'responseType'  : 'blob' as 'json'        //This also worked
      };
      let API_URL = `${this.baseURL}/download/${id}/`;
      return this.http.get(API_URL, httpOptions);
    }

    getFilesByUserId(user_id: any): Observable<any>{
      console.log("hey user id", user_id);
      let API_URL = `${this.baseURL}/by/${user_id}`;
      return this.http.get(API_URL, {headers: this.headers,withCredentials: false }).pipe(map(res => {
        console.log("hey data ", res)
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
    }
    // Error handling /by/user_id/{user_id}
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
