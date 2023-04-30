import { Injectable } from '@angular/core';
import {RatingApiService} from './rating-api.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor( private ratingApi: RatingApiService ) {

  }

  getRatings() {
     return this.ratingApi.getRatings() ;
  }

  connectUrl( rate: any ) {
     let rateImg = ''
     for( let x of rate ){
        rateImg += 'rateImg=' + x.id + '&&' ;
     }
     return rateImg ;
  }

  getRatingsImage( rate: any ) {
      return this.ratingApi.getRatingImage( this.connectUrl(rate) ) ;
  }

  updateRating( rate: any ){
      return this.ratingApi.updateRating( this.connectUrl(rate) );
  }

  deleteRating( rate: any ){
      return this.ratingApi.deleteRating( this.connectUrl(rate )) ;
  }
}
