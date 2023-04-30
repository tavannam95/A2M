import { Injectable } from '@angular/core';
import { MovieApiService } from './movie-api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private apiService: MovieApiService) { }

  getAll(){
    return this.apiService.getAll();
  }

  getOne(id: any){
    return this.apiService.getOne(id);
  }

  createMovie(data: any){
    return this.apiService.createMovie(data);
  }

  updateMovie(data:any){
    return this.apiService.updateMovie(data);
  }

  activeOrInactive(data: any){
    return this.apiService.activeOrInactive(data);
  }


}
