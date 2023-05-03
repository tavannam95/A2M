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

  getBillUser(){
    return this.apiService.getBillUser();
  }

  printTicket(data: any){
    return this.apiService.printTicket(data);
  }

  getOne(id: any){
    return this.apiService.getOne(id);
  }

  findByBarcode(barcode: any){
    return this.apiService.findByBarcode(barcode);
  }
}
