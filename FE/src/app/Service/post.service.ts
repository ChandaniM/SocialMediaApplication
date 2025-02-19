import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  BASE_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getPosts(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.BASE_URL + 'list-of-post', {
      params: { userId: id.toString() },
    });
  }

  addPost(postData: any): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL + 'add-post', postData);
  }

  addComment(data: any): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL + 'add-comment', data);
  }
  uploadPost(formData: FormData) {
    return this.httpClient.post(`${this.BASE_URL}upload`, formData, {
      responseType: 'text',
    });
  }
  
  getImage(imageKey: string): Observable<Blob> {
    return this.httpClient.get(`${this.BASE_URL}/image/${imageKey}`, {
      responseType: 'blob'
    })
  }
}

