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

  createRoom(data: any){
    return this.apiService.createRoom(data);
  }

  updateRoom(data:any){
    return this.apiService.updateRoom(data);
  }

  activeOrInactive(data: any){
    return this.apiService.activeOrInactive(data);
  }


}
