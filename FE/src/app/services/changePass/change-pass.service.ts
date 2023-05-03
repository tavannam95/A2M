import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  constructor(
    private http: HttpClient
  ) { }

  changepass(username: string, email: string): Observable<any>{
    const url = "http://localhost:8080/api/v1/auth"
    return this.http.get<any>(url+"/changePass?username=" + username + '&email='+email);
  }

  savePass(data: any): Observable<any>{
    const url = "http://localhost:8080/api/v1/auth"
    return this.http.put<any>(url+"/savePass", data);
  }
}
