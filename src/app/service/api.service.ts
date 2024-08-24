import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://api-production.lagadelas.com/';

  constructor(private http: HttpClient) { }

  postData(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('There was an error!', error);
        throw error;
      })
    );
  }
}
