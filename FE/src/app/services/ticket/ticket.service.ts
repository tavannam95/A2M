import { Injectable } from '@angular/core';
import { TicketApiService } from './ticket-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

constructor(private apiService: TicketApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

  getOne(id: any){
    return this.apiService.getOne(id);
  }
}
