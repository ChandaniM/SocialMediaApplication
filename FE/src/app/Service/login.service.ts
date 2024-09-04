import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = false;
  BASE_URL = environment.apiUrl;

  constructor(public http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
   }

  login(email: string, password: string): Observable<LoginResponse> {
    console.log(this.BASE_URL + 'login', "url");
    return this.http.post<LoginResponse>(this.BASE_URL + 'login', { email, password });
  }

  islogout() {
    this.isLoggedIn = false;
    localStorage.clear()
  }

  islogin() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
