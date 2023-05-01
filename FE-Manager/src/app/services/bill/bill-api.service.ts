import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

@Injectable({
  providedIn: 'root'
})
export class BillApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.bill}/listBill`,{headers: headers});
  }

  getOne(id: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.bill}/${id}`,{headers: headers});
  }

  createBill(data: any):Observable<any>{
    return this.http.post<any>(`${ApiConstant.bill}/create`,data,{headers: headers});
  }

  getBillUser(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.bill}/billUser`,{headers: headers});
  }
}
