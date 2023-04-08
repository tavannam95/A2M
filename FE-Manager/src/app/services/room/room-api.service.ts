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

  createRoom(data: any): Observable<any>{
    return this.http.post(ApiConstant.room,data);
  }

 updateRoom(data: any): Observable<any>{
    return this.http.put(ApiConstant.room,data);
  }

  activeOrInactive(data: any): Observable<any>{
    return this.http.put(`${ApiConstant.room}/active-or-inactive`,data);
  }

}
