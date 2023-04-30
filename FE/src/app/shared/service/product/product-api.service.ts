import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {

    constructor(private readonly http: HttpClient) {
    }

    getAllProduct(): Observable<any> {
        return this.http.get(ApiConstant.product);
    }

    getOneProduct(id: number) {
        return this.http.get(`${ApiConstant.product}/${id}`);
    }

    getProductById(id:number):Observable<any>{
        return this.http.get(`${ApiConstant.product}/${id}`);
    }


    createProduct(data: any): Observable<any> {
        return this.http.post(ApiConstant.product, data);
    }

    updateProduct(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.product}/${id}`, data);
    }

    deleteProduct(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.product}/${id}`, data);
    }

    getProductView(data: any) {
        return this.http.post(`${ApiConstant.product}/view`, data);
    }

    getByBarcode(barcode:any): Observable<any>{
        return this.http.get(`${ApiConstant.productDetail}/getByBarcode/${barcode}`)
    }

    generateBarcode(id:any): Observable<any>{
        return this.http.get(`${ApiConstant.productDetail}/generateBarcode/${id}`)
    }

    getProByCate( data: any ){
        return this.http.post(`${ApiConstant.product}/findProByCate` , data)
    }

}
