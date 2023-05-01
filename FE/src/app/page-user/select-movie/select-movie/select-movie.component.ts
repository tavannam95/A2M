// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicApiService } from 'app/services/public/public-api.service';
import { ShowtimeService } from 'app/services/showtime/showtime.service';

@Component({
  selector: 'app-select-movie',
  templateUrl: './select-movie.component.html',
  styleUrls: ['./select-movie.component.scss']
})
export class SelectMovieComponent implements OnInit {

  idMovie: number;
  movies: any;

  listShowtime: any;
  selectDate: any;

  timeShowtime: any;

  constructor(
    private route: ActivatedRoute,
    // private datePipe: DatePipe,
    private showtimeService: ShowtimeService,
    private router: Router,
    private publicApiService: PublicApiService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.idMovie = Number(params.get('id'));
    });
    this.getAllShowtimeActive();
  }

  selectShowtime(showtimeId: any){
    const queryParams = {
      id: showtimeId
    };
    this.router.navigate(['/select-seat'],{queryParams})
    
  }

  getAllShowtimeActive(){
    this.publicApiService.getAllShowtimeActive().subscribe({
      next: res=>{
        this.movies = res.data;
        this.publicApiService.findByMovie(this.idMovie).subscribe({
          next: res =>{
            this.listShowtime = res.data;
            this.selectDate = this.listShowtime[0].date;
            console.log(this.selectDate);
            this.publicApiService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
              next: res =>{
                console.log(res);
                
                this.timeShowtime = res.data;
                console.log(this.timeShowtime);
                
                
              },
              error: e =>{
                console.log(e);
                
              }
            })
            
          },
          error: e =>{
            console.log(e);
            
          }
        })
      }
    })
  }

  selectMovie(event: any){
    let idMovie = event.value;
    this.publicApiService.findByMovie(idMovie).subscribe({
      next: res =>{
        this.listShowtime = res.data;
        this.selectDate = this.listShowtime[0].date;
        this.publicApiService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
          next: res =>{
            this.timeShowtime = res.data;
          },
          error: e =>{
            console.log(e);
            
          }
        })
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

  changeDate(event: any){
    this.publicApiService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
      next: res =>{
        this.timeShowtime = res.data;
        console.log(this.timeShowtime);
      },
      error: e =>{
        console.log(e);
      }
    })
  }

}
