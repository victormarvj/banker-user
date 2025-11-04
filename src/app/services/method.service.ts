import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MethodService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/methods/all-methods`, {
      withCredentials: true,
    });
  }

  retrieveCryptoMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/methods/crypto-methods`, {
      withCredentials: true,
    });
  }
}
