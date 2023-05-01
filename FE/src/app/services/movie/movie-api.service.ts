import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  [x: string]: any;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.movie}/listMovie`);
  }

  getOne(id: any): Observable<any> {
    return this.http.get<any>(`${ApiConstant.movie}/${id}`);
  }

  createMovie(data: any): Observable<any> {
    return this.http.post<any>(`${ApiConstant.movie}/addMovie`, data);
  }

  updateMovie(data: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.movie}/updateMovie`, data);
  }

  activeOrInactive(data: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.movie}/deleteMovie`, data);
  }

}
