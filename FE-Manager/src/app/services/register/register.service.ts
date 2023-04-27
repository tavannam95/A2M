import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  createUser(data: any): Observable<any> {
    const url = "http://localhost:8080/api/v1/auth"
    return this.http.post(url+"/createAccount", data);
  }
}
