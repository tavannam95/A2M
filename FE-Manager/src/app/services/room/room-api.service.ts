import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(ApiConstant.room,{headers: headers});
  }

  create(data: any): Observable<any>{
    return this.http.post<any>(`${ApiConstant.room}/create`,data,{headers: headers});
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.room, data,{headers: headers});
  }

  getOne(id: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.room}/${id}`,{headers: headers});
  }

  createRoom(data: any): Observable<any>{
    return this.http.post<any>(ApiConstant.room,data,{headers: headers});
  }

 updateRoom(data: any): Observable<any>{
    return this.http.put<any>(ApiConstant.room,data,{headers: headers});
  }

  activeOrInactive(data: any): Observable<any>{
    return this.http.put<any>(`${ApiConstant.room}/active-or-inactive`,data,{headers: headers});
  }

  changeSeatType(seatId: any,seatType:any):Observable<any>{
    return this.http.put<any>(`${ApiConstant.room}/change-seat-type/${seatId}`,seatType,{headers: headers});
  }

  getAllSeatType():Observable<any>{
    return this.http.get<any>(`${ApiConstant.room}/seat-type`,{headers: headers});
  }

  removeAll(roomId: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.room}/remove-all/${roomId}`,{headers: headers});
  }

}
