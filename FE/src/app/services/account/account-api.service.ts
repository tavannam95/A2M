import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(ApiConstant.account + "/getAll");
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.account + "/createAccount", data);
  }

  getEmails(): Observable<any> {
    return this.http.get<any>(ApiConstant.account + "/getEmail");
  }

  updateAccount(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.put<any>(ApiConstant.account + "/updateAccount", data);
  }
}
