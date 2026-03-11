import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './note';

export interface Memories{
  id: string;
  imageUrl: string;
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
    return this.http.get<ApiResponse<Memories[]>>(this.apiUrl);
  }

  create(title: string, description: string, image: File): Observable<ApiResponse<Memories>> {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    return this.http.post<ApiResponse<Memories>>(this.apiUrl, formData);
  }

}
