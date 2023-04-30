import { Injectable } from '@angular/core';
import { BillApiService } from './bill-api.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {

constructor(private apiService: BillApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

  getOne(id: any){
    return this.apiService.getOne(id);
  }
}
