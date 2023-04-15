import { Injectable } from '@angular/core';
import { FareApiService } from './fare-api.service';

@Injectable({
  providedIn: 'root'
})
export class FareService {

constructor(private apiService: FareApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

}
