import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiResponse } from './note';
import { environment } from '../../../environments/environment.development';
import { response } from 'express';

interface LoginResponse {
  message: string;
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api`;

  isLoggedIn = signal(false);

  constructor(){
    const token = localStorage.getItem('token');
    if (token) this.isLoggedIn.set(true);
  }

  login(credencials: LoginCredentials){
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credencials).pipe(
      tap(
        response => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.isLoggedIn.set(true);
      })
    )
  }

  register(credencials: RegisterCredentials){
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/users/register`, credencials);
  }

  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

}
