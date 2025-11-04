import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/upload-image`, data, {
      reportProgress: true,
    });
  }
}
