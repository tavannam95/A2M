import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  constructor(private http: HttpClient) { }

  today():Observable<any>{
    return this.http.get(`${ApiConstant.public}/today`);
  }

  getAllShowtimeActive():Observable<any>{
    return this.http.get(`${ApiConstant.public}/all-active`);
  }

  findByMovie(idMovie: number):Observable<any>{
    return this.http.get(`${ApiConstant.public}/${idMovie}`);
  }

  getShowtimeByMovieAndDate(idMovie: number, date: any):Observable<any>{
    return this.http.post(`${ApiConstant.public}/time/${idMovie}`,date);
  }

  findByIsHoliday(isHoliday: any): Observable<any>{
    return this.http.get(`${ApiConstant.public}/fare/${isHoliday}`);
  }

  findByShowtime(showtimeId: any):Observable<any>{
    return this.http.get(`${ApiConstant.public}/showtime/${showtimeId}`);
  }

  findById(showtimeId: any):Observable<any>{
    return this.http.get(`${ApiConstant.public}/id/${showtimeId}`);
  }

  createBill(data: any):Observable<any>{
    return this.http.post(`${ApiConstant.public}/create`,data);
  }

  getByRoom(data: any): Observable<any>{
    return this.http.post(`${ApiConstant.public}/row-of-room`,data);
  }

}
