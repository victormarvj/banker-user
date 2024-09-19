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
    return this.http.post(`${this.apiUrl}/user/transfer/get-otp`, {
      withCredentials: true,
    });
  }

  checkAccountNumber(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/transfer/check-account-number`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  checkAccountNumberInternational(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/transfer/check-account-number-international`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  transferDomestic(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/transfer/domestic-transfer`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  transferInternational(formData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/user/transfer/international-transfer`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  getTransactionDetails(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/transfer/transactions/${id}`, {
      withCredentials: true,
    });
  }

  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/transfer/transactions`, {
      withCredentials: true,
    });
  }

  getLatestTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/transfer/get-latest`, {
      withCredentials: true,
    });
  }

  getInvoices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/transfer/get-invoices`, {
      withCredentials: true,
    });
  }

  getBeneficiaries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/transfer/beneficiaries`, {
      withCredentials: true,
    });
  }

  downloadReceipt(id: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/user/transfer/transactions/receipt/${id}`,
      {
        withCredentials: true,
        responseType: 'blob',
      }
    );
  }
}
