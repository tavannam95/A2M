import { Injectable } from '@angular/core';
import { RowApiService } from './row-api.service';

@Injectable({
  providedIn: 'root'
})
export class RowService {

constructor(private apiService: RowApiService) { }

createRow(data:any){
  return this.apiService.createRow(data);
}

}
