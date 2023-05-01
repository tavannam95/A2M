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
    return this.http.post<any>(ApiConstant.row, data);
  }

  getByRoom(data: any): Observable<any> {
    return this.http.post<any>(`${ApiConstant.row}/row-of-room`, data);
  }

  activeOrInactive(data: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.row}/active-or-inactive`, data);
  }

}
