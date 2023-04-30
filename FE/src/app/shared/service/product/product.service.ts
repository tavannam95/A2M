import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ProductApiService} from './product-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private readonly apiService: ProductApiService,
                private readonly toastService: ToastrService) {
    }

    getAllProduct() {
        return this.apiService.getAllProduct();
    }

    createProduct(data: any) {
        return this.apiService.createProduct(data);
    }

    getOneProduct(data: number) {
        return this.apiService.getOneProduct(data);
    }

    getProductById(id:number){
        return this.apiService.getProductById(id);
    }

    updateProduct(data: any, id: number) {
        return this.apiService.updateProduct(data, id);
    }

    getProductView(data: any) {
        return this.apiService.getProductView(data);
    }

    getByBarcode(barcode:any){
        return this.apiService.getByBarcode(barcode);
    }

    generateBarcode(id:any){
        return this.apiService.generateBarcode(id);
    }

    getProByCate( data: any ){
        return this.apiService.getProByCate(data) ;
    }
}
