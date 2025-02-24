import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findAddress(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/addresses/find-address/${id}`, {
      withCredentials: true,
    });
  }
}
