import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { PeriodicElement } from 'app/page/showtime/showtime-form/showtime-form.component';
import { HeadersUtil } from 'app/util/headers-util';
import { Observable } from 'rxjs';

const headers: HttpHeaders = HeadersUtil.getHeadersAuth();


@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

constructor(private http: HttpClient) { }


  today():Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/today`,{headers: headers});
  }
  getAllShowtimes(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.showtime}/getAllShowtimes`,{headers: headers});
  }

  getMoviesByDate(date: string): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getMoviesByDate?date=`+date,{headers: headers});
  }

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.showtime}/getAllRooms`,{headers: headers});
  }

  getShowTimeByDate(date: string, id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowTimeByDate?date=`+date+`&id=`+id,{headers: headers});
  }

  saveShowtime(data: any): Observable<any>{
    return this.http.post<any>(`${ApiConstant.showtime}/saveShowtimes`, data,{headers: headers});
  }

  updateData(data: any): Observable<any>{
    return this.http.put<any>(`${ApiConstant.showtime}/updateData`, data,{headers: headers});
  }

  getShowtimesByDate(date: string): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowtimesByDate?date=`+date,{headers: headers});
  }

  getShowtimesByIDRoom(id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowtimesByID?id=`+id,{headers: headers});
  }

  getShowTimeByDateAndID(date: string, id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowTimeByDateAndID?date=`+date+`&id=`+id,{headers: headers});
  }
  getAllShowtimeActive():Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/all-active`,{headers: headers});
  }

  findByMovie(idMovie: number):Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/${idMovie}`,{headers: headers});
  }

  getShowtimeByMovieAndDate(idMovie: number, date: any):Observable<any>{
    return this.http.post<any>(`${ApiConstant.showtime}/time/${idMovie}`,date,{headers: headers});
  }

  findById(showtimeId: any):Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/id/${showtimeId}`,{headers: headers});
  }
}
