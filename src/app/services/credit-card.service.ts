import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  makePayment(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/credit-cards/make-payment`,
      formData,
      { withCredentials: true },
    );
  }
}
