import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    return this.http.get<any>(ApiConstant.room,{headers: headers});
  }

  create(data: any): Observable<any>{
    return this.http.post(`${ApiConstant.room}/create`,data);
  }

  save(data: any): Observable<any> {
    return this.http.post(ApiConstant.room, data);
  }

  getOne(id: any): Observable<any>{
    return this.http.get(`${ApiConstant.room}/${id}`);
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

  changeSeatType(seatId: any,seatType:any):Observable<any>{
    return this.http.put(`${ApiConstant.room}/change-seat-type/${seatId}`,seatType);
  }

  getAllSeatType():Observable<any>{
    return this.http.get(`${ApiConstant.room}/seat-type`);
  }

  removeAll(roomId: any): Observable<any>{
    return this.http.get(`${ApiConstant.room}/remove-all/${roomId}`);
  }

}
