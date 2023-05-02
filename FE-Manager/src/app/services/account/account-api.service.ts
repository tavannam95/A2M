import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.get<any>(ApiConstant.account + "/getAll", { headers: headers });
  }

  save(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.post<any>(ApiConstant.account + "/createAccount", data, { headers: headers });
  }

  getEmails(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.get<any>(ApiConstant.account + "/getEmail", { headers: headers });
  }

  updateAccount(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.put<any>(ApiConstant.account + "/updateAccount", data, { headers: headers });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(ApiConstant.account+"/userLogin", {headers: headers});
  }

  updateUser(data: any): Observable<any> {
    return this.http.put<any>(ApiConstant.account+"/updateUser", data, {headers: headers});
  }

  getPassword(): Observable<any> {
    return this.http.get<any>(ApiConstant.account+"/userPassword", {headers: headers});
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put<any>(ApiConstant.account+"/updatePassword", data, {headers: headers});
  }

  checkPassword(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.account+"/checkPassword", data,{headers: headers});
  }
}
