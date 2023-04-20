import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

constructor(private http: HttpClient) { }


  today():Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/today`);
  }

  getAllShowtimes(): Observable<any> {
    return this.http.get(`${ApiConstant.showtime}/getAllShowtimes`);
  }

  getMoviesByDate(date: string): Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/getMoviesByDate?date=`+date);
  }

  getAllRooms(): Observable<any> {
    return this.http.get(`${ApiConstant.showtime}/getAllRooms`);
  }

  getShowTimeByDate(date: string, id: number): Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/getShowTimeByDate?date=`+date+`&&id=`+id);
  }

  saveShowtime(data: any): Observable<any>{
    return this.http.post(`${ApiConstant.showtime}/saveShowtimes`, data);
  }
}
