import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.apiUrl;

  constructor(public http:HttpClient) { }
  getAllUserList():Observable<User[]>{
    return this.http.get<User[]>(this.BASE_URL+'userlist');
  }
}
