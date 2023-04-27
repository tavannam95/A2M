import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.movie}/listMovie`,{headers: headers});
  }

  getOne(id: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.movie}/${id}`,{headers: headers});
  }

  createMovie(data: any): Observable<any>{
    return this.http.post<any>(`${ApiConstant.movie}/addMovie`,data,{headers: headers});
  }

 updateMovie(data: any): Observable<any>{
    return this.http.put<any>(`${ApiConstant.movie}/updateMovie`,data,{headers: headers});
  }

  activeOrInactive(data: any): Observable<any>{
    return this.http.put<any>(`${ApiConstant.movie}/deleteMovie`,data,{headers: headers});
  }

}
