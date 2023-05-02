import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';


@Injectable({
  providedIn: 'root'
})
export class BillApiService {
  [x: string]: any;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.get<any>(`${ApiConstant.bill}/listBill`, { headers: headers });
  }

  getOne(id: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.get<any>(`${ApiConstant.bill}/${id}`, { headers: headers });
  }

  createBill(data: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.post<any>(`${ApiConstant.bill}/create`, data, { headers: headers });
  }

  getBillUser(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.bill}/billUser`,{headers: headers});
  }
}
