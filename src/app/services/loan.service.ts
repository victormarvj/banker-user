import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  requestCarLoan(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/loans/car-loan`, formData, {
      withCredentials: true,
    });
  }
  getLoans(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/loans/car-loan`, {
      withCredentials: true,
    });
  }
}
