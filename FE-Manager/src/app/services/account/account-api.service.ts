import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(ApiConstant.account+"/getAll",{headers: headers});
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.account+"/createAccount", data,{headers: headers});
  }

  getEmails(): Observable<any> {
    return this.http.get<any>(ApiConstant.account+"/getEmail",{headers: headers});
  }

  updateAccount(data: any): Observable<any> {
    return this.http.put<any>(ApiConstant.account+"/updateAccount", data,{headers: headers});
  }
}
