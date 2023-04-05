import { Injectable } from '@angular/core';
import { RoomApiService } from './room-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

constructor(private apiService: RoomApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

  save(data: any){
    return this.apiService.save(data);
  }

}
