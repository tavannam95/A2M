import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(ApiConstant.room);
  }

  save(data: any): Observable<any>{
    return this.http.post(ApiConstant.room,data);
  }

}
