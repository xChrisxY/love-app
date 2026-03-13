import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from './note';

export interface CustomList {
  id: string;
  title: string;
  type: string;
  createdAt: string;
}

export interface CustomListData {
  title: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListsService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/lists`;
  
  getAll(): Observable<ApiResponse<CustomList[]>> {
    return this.http.get<ApiResponse<CustomList[]>>(this.apiUrl);
  }

  create(customListData: CustomListData): Observable<ApiResponse<CustomList>> {
    return this.http.post<ApiResponse<CustomList>>(this.apiUrl, customListData);

  }

}
