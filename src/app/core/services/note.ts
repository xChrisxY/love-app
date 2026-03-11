import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Note {
  id: string;
  content: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/notes`;

  getAll(): Observable<ApiResponse<Note[]>> {
    return this.http.get<ApiResponse<Note[]>>(this.apiUrl);
  }

  create(content: string): Observable<ApiResponse<Note>> {
    return this.http.post<ApiResponse<Note>>(this.apiUrl, { content });
  }

}
