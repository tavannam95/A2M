import { Injectable } from '@angular/core';
import { NationApiService } from './nation-api.service';

@Injectable({
  providedIn: 'root'
})
export class NationService {

constructor(private apiService: NationApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

}
