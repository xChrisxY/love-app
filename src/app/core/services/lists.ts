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

export interface ListItem {
  id: string;
  content: string;
  status: 'PENDING'| 'DONE';
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

  getItems(listId: string): Observable<ApiResponse<ListItem[]>> {
    return this.http.get<ApiResponse<ListItem[]>>(`${this.apiUrl}/${listId}`);
  }

  createItem(listId: string, content: string): Observable<ApiResponse<ListItem>> {
    return this.http.post<ApiResponse<ListItem>>(`${this.apiUrl}/${listId}`, {content: content})
  }

}
