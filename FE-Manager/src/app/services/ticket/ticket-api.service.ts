import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

@Injectable({
  providedIn: 'root'
})
export class TicketApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>(`${ApiConstant.ticket}/listTicket`,{headers: headers});
  }

  getOne(id: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.ticket}/${id}`,{headers: headers});
  }

  findByShowtime(showtimeId: any):Observable<any>{
    return this.http.get<any>(`${ApiConstant.ticket}/showtime/${showtimeId}`,{headers: headers});
  }

  findByIsHoliday(isHoliday: any): Observable<any>{
    return this.http.get<any>(`${ApiConstant.ticket}/fare/${isHoliday}`,{headers: headers});
  }
}
