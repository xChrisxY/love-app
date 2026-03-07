import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

interface LoginResponse {
  message: string;
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.1.71:8080/api/auth/login';

  isLoggedIn = signal(false);

  constructor(){
    const token = localStorage.getItem('token');
    if (token) this.isLoggedIn.set(true);
  }

  login(credencials: LoginCredentials){

    return this.http.post<LoginResponse>(this.apiUrl, credencials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn.set(true);
      })
    )

  }

  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

}
