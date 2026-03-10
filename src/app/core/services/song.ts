import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './note';

export interface Song{
  id: string;
  url: string;
  message: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})


export class SongService {

  private http = inject(HttpClient);
  private apiUrl = "http://192.168.1.71:8080/api/songs";

  getAll(): Observable<ApiResponse<Song[]>> {
    return this.http.get<ApiResponse<Song[]>>(this.apiUrl);
  }

}
