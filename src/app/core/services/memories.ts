import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './note';

export interface Memories{
  id: string;
  image_url: string;
  title: string;
  description: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})

export class MemoriesService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/memories`;
  

  getAll(): Observable<ApiResponse<Memories[]>> {
    console.log(this.apiUrl);
    return this.http.get<ApiResponse<Memories[]>>(this.apiUrl);
  }

}
