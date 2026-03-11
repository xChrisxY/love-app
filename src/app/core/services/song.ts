import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './note';
import { environment } from '../../../environments/environment.development';

export interface Song{
  id: string;
  url: string;
  message: string;
  created_at: string;
}

export interface SongData {
  url: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})


export class SongService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/songs`;

  getAll(): Observable<ApiResponse<Song[]>> {
    return this.http.get<ApiResponse<Song[]>>(this.apiUrl);
  }

  create(songData: SongData): Observable<ApiResponse<Song>>{
    return this.http.post<ApiResponse<Song>>(this.apiUrl, songData);
  }

}
