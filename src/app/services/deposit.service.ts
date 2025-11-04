import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  makeDeposit(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/deposits/make-deposit`,
      formData,
      { withCredentials: true }
    );
  }

  allDeposits() {
    return this.http.get(`${this.apiUrl}/user/deposits/all-deposit`, {
      withCredentials: true,
    });
  }
}
