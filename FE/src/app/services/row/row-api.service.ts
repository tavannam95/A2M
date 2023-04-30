import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RowApiService {

  constructor(private http: HttpClient) { }

  createRow(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.post<any>(ApiConstant.row, data, { headers: headers });
  }

  getByRoom(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.post<any>(`${ApiConstant.row}/row-of-room`, data, { headers: headers });
  }

  activeOrInactive(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.put<any>(`${ApiConstant.row}/active-or-inactive`, data, { headers: headers });
  }

}
