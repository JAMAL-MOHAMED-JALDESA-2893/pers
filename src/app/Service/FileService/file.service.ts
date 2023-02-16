import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }
  upload(formData: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/api/v1/user/documents/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/user/documents/files`);
  }
  downloadFile(id: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/user/documents/files/${id}`);
  }
  // getEmployeeFile(user_id: any): Observable<any>{
  //   console.log("got this", user_id);
  //   return this.http.get(`${this.baseUrl}/files/user/${user_id}`);
  // }
  getEmployeeFile(user_id: any): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob',  withCredentials: false };
    const httpOptions = {
      // 'responseType'  : 'arraybuffer' as 'json'
       'responseType'  : 'blob' as 'json'        //This also worked
    };
    let API_URL = `${this.baseUrl}/api/v1/user/documents/files/user/${user_id}`;
    return this.http.get(API_URL, httpOptions);
  }
}
