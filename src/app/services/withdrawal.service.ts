import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  newWithdrawal(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/withdrawals/new-withdrawal`,
      formData,
      { withCredentials: true }
    );
  }

  getWithdrawals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/withdrawals/all-withdrawals`, {
      withCredentials: true,
    });
  }
}
