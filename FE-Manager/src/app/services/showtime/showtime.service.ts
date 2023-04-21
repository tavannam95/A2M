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

  getAllShowtimeActive():Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/all-active`);
  }

  findByMovie(idMovie: number):Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/${idMovie}`);
  }

  getShowtimeByMovieAndDate(idMovie: number, date: any):Observable<any>{
    return this.http.post(`${ApiConstant.showtime}/time/${idMovie}`,date);
  }

  findById(showtimeId: any):Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/id/${showtimeId}`);
  }

}
