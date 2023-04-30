import { Injectable } from '@angular/core';
import { ProductImageApiService } from './product-image-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

constructor(
  private apiService: ProductImageApiService
) { }
getAllProductImage() {
  return this.apiService.getAllProductImage();
}

getProductImage(id: number) {
  return this.apiService.getProductImage(id);
}
createProductImage(data: any) {
  return this.apiService.createProductImage(data);
}
getProductImageById(id: any){
  return this.apiService.getProductImageById(id);
}
deleteProductImage(data: any, id: number){
  return this.apiService.deleteProductImage(data,id);
}
}
