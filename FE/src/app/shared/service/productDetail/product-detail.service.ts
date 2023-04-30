import { Injectable } from '@angular/core';
import { ProductDetailApiService } from './product-detail-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

constructor(
  private readonly apiService: ProductDetailApiService
) { }
createProductDetail(data: any){
   return this.apiService.createProductDetail(data);
}

getProductDetailById(data: any){
  return this.apiService.getProductDetailById(data);
}
getOneProductDetail(id: any){
  return this.apiService.getOneProductDetail(id);
}
updateProductDetail(data: any){
  return this.apiService.updateProductDetail(data);
}
dowloadExcel(){
  return this.apiService.dowloadExcel();
}
}
