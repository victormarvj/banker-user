import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  csrfUrl = environment.csrfUrl;

  $userSignal = signal<any | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, formData, {
      withCredentials: true,
    });
  }

  getCrsfToken(): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true });
  }

  login(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, formData, {
      withCredentials: true,
    });
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { withCredentials: true });
  }

  logOut(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/logout`, {
      withCredentials: true,
    });
  }

  getAuthToken() {
    // Retrieve user data from localStorage
    if (this.isBrowser()) {
      const bankerUser = localStorage.getItem('bankerUser');
      let token = '';

      if (bankerUser) {
        const userDetails = JSON.parse(bankerUser);
        token = userDetails?.token;
      }
      return token;
    }

    return null;
  }

  // Set user details with expiry (1 day)
  setUserSignal(response: any): Observable<any> {
    const expiryDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
    let user = response.user;

    const userDetails = {
      user,
      expiry: expiryDate,
      token: response.token,
    };

    if (this.isBrowser()) {
      localStorage.removeItem('bankerUser');
      localStorage.setItem('bankerUser', JSON.stringify(userDetails));
      this.$userSignal.set(user); // Update the signal with the user
    }
    return user;
  }

  get getAuthenticatedUserStorage() {
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('bankerUser');

      if (!storedUser) {
        return this.isAuthUserSignal();
      }

      let user = JSON.parse(storedUser);

      this.$userSignal.set(user.user);
      return this.$userSignal();
    }
  }

  revokeAuthStorage() {
    if (this.isBrowser()) {
      localStorage.removeItem('bankerUser');
      this.isAuthUserSignal();
    }
  }

  updateUserSignal(user: any) {
    this.$userSignal.set(user);
  }

  // Get user details and check for expiry
  isAuthUserSignal() {
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('bankerUser');
      if (storedUser) {
        const userDetails = JSON.parse(storedUser);
        const now = new Date().getTime();

        // Check if the stored user has expired
        if (now > userDetails.expiry) {
          this.logOut().subscribe(() => {
            localStorage.removeItem('bankerUser');
            this.router.navigate(['/signin']);
            this.$userSignal.set(null);
          });
        } else {
          this.$userSignal.set(userDetails.user); // Update signal with user details
          // return userDetails.user;
          this.router.navigate(['/dashboard/home']);
        }
      } else {
        this.router.navigate(['/signin']);
      }
    }
    return null;
  }

  private isBrowser() {
    return typeof window !== 'undefined';
  }
}