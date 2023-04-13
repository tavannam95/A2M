import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${ApiConstant.movie}/listMovie`);
  }

  getOne(id: any): Observable<any>{
    return this.http.get(`${ApiConstant.movie}/${id}`);
  }

  createMovie(data: any): Observable<any>{
    return this.http.post(`${ApiConstant.movie}/addMovie`,data);
  }

 updateMovie(data: any): Observable<any>{
    return this.http.put(`${ApiConstant.movie}/updateMovie`,data);
  }

  activeOrInactive(data: any): Observable<any>{
    return this.http.put(`${ApiConstant.movie}/deleteMovie`,data);
  }

}
