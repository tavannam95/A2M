import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryApiService {

    constructor(private readonly http: HttpClient) {
    }

    getAllCategory() {
        return this.http.get(`${ApiConstant.category}/findAll`);
    }

    getCategory(id: number) {
        return this.http.get(`${ApiConstant.category}/${id}`);
    }

    findAllByStatus(): Observable<any> {
        return this.http.get(`${ApiConstant.category}/all`);
    }

    createCategory(data: any): Observable<any> {
        return this.http.post(ApiConstant.category, data);
    }

    updateCategory(data: any): Observable<any> {
        return this.http.put(`${ApiConstant.category}`, data);
    }

    deleteCategory(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.category}/${id}`, data);
    }
}
