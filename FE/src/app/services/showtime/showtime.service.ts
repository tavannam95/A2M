import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { PeriodicElement } from 'app/page/showtime/showtime-form/showtime-form.component';
import { HeadersUtil } from 'app/util/headers-util';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

constructor(private http: HttpClient) { }


  today():Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/today`);
  }
  getAllShowtimes(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.showtime}/getAllShowtimes`);
  }

  getMoviesByDate(date: string): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getMoviesByDate?date=`+date);
  }

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.showtime}/getAllRooms`);
  }

  getShowTimeByDate(date: string, id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowTimeByDate?date=`+date+`&id=`+id);
  }

  saveShowtime(data: any): Observable<any>{
    return this.http.post<any>(`${ApiConstant.showtime}/saveShowtimes`, data);
  }

  updateData(data: any): Observable<any>{
    return this.http.put<any>(`${ApiConstant.showtime}/updateData`, data);
  }

  getShowtimesByDate(date: string): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowtimesByDate?date=`+date);
  }

  getShowtimesByIDRoom(id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowtimesByID?id=`+id);
  }

  getShowTimeByDateAndID(date: string, id: number): Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/getShowTimeByDateAndID?date=`+date+`&id=`+id);
  }
  getAllShowtimeActive():Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/all-active`);
  }

  findByMovie(idMovie: number):Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/${idMovie}`);
  }

  getShowtimeByMovieAndDate(idMovie: number, date: any):Observable<any>{
    return this.http.post<any>(`${ApiConstant.showtime}/time/${idMovie}`,date);
  }

  findById(showtimeId: any):Observable<any>{
    return this.http.get<any>(`${ApiConstant.showtime}/id/${showtimeId}`);
  }
}
