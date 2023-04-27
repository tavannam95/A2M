import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();


@Injectable({
  providedIn: 'root'
})
export class NationApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.nation}/listNational`,{headers: headers});
  }

}
