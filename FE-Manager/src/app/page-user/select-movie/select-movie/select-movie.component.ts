import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowtimeService } from 'app/services/showtime/showtime.service';

@Component({
  selector: 'app-select-movie',
  templateUrl: './select-movie.component.html',
  styleUrls: ['./select-movie.component.scss']
})
export class SelectMovieComponent implements OnInit {

  idMovie: number;
  movies: any;

  constructor(
    private route: ActivatedRoute,
    private showtimeService: ShowtimeService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.idMovie = Number(params.get('id'));
      console.log(this.idMovie);
    });
    this.getAllShowtimeActive();
  }

  getAllShowtimeActive(){
    this.showtimeService.getAllShowtimeActive().subscribe({
      next: res=>{
        console.log(res);
        this.movies = res.data;
      }
    })
  }

  showid(event: any){
    let idMovie = event.value;
    this.showtimeService.findByMovie(idMovie).subscribe({
      next: res =>{
        console.log(res);
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

}
