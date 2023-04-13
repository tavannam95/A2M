import { Injectable } from '@angular/core';
import { CategoriesApiService } from './categories-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

constructor(private apiService: CategoriesApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

}
