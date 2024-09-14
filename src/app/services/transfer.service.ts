import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getBanks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/banks/get-banks`, {
      withCredentials: true,
    });
  }

  getOTP(): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/get-otp`, {
      withCredentials: true,
    });
  }

  transferDomestic(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/domestic-transfer`, formData, {
      withCredentials: true,
    });
  }
}
