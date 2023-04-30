import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})


export class RatingApiService {

  constructor( private http: HttpClient ) { }

  getRatings(){
     return this.http.get(`${ApiConstant.rating}/getRatingWithStatus`) ;
  }

  getRatingImage( url: any ){
      return this.http.get(`${ApiConstant.ratingImg}/getRatingImg?${url}`)
  }

  updateRating( url: any ){
      return this.http.get(`${ApiConstant.rating}/updateRatingImage?${url}`) ;
  }

  deleteRating( url:any ){
      return this.http.get(`${ApiConstant.rating}/deleteRating?${url}`) ;
  }
}
