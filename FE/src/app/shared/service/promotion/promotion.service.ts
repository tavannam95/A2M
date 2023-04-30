import { Injectable } from '@angular/core';
import {PromotionApiService} from './promotion-api.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor( private api: PromotionApiService) { }

  findAll( data: any){
     return this.api.findAll(data) ;
  }

  create( data: any ){
     return this.api.create( data ) ;
  }

  update( data: any ){
    return this.api.update( data )
  }

  addProductIntoPromotion( listPro:any , idDis: any ){
     var url = '' ;
     for( let x of listPro ){
        url += 'idPro=' + x.id + '&';
     }
     url += 'idDis=' + idDis ;
     return this.api.addProductIntoPromotion( url );
  }

    getAllProductDiscount( data:any){
      return this.api.getAllProductDiscount(data) ;
    }
}
