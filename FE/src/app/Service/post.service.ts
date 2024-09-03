import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl = 'https://your-api-url.com/api/posts'; // replace with your API URL

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }
}

