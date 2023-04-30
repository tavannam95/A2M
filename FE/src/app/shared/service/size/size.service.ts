import { Injectable } from '@angular/core';
import { SizeApiService } from './size-api.service';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

constructor(
  private apiService: SizeApiService
) { }
getAllSize(){
  return this.apiService.getAllSize();
}
getOneSize(id: any){
  return this.getOneSize(id);
}
}
