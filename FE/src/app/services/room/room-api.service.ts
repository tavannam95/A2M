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
    return this.http.get<any>(ApiConstant.room);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${ApiConstant.room}/create`, data);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.room, data);
  }

  getOne(id: any): Observable<any> {
    return this.http.get<any>(`${ApiConstant.room}/${id}`);
  }

  createRoom(data: any): Observable<any> {
    return this.http.post<any>(ApiConstant.room, data);
  }

  updateRoom(data: any): Observable<any> {
    return this.http.put<any>(ApiConstant.room, data);
  }

  activeOrInactive(data: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.room}/active-or-inactive`, data);
  }

  changeSeatType(seatId: any, seatType: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.room}/change-seat-type/${seatId}`, seatType);
  }

  getAllSeatType(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.room}/seat-type`);
  }

  removeAll(roomId: any): Observable<any> {
    return this.http.get<any>(`${ApiConstant.room}/remove-all/${roomId}`);
  }

}
