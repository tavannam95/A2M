// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.idMovie = Number(params.get('id'));
      console.log(this.idMovie);
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
    this.showtimeService.getAllShowtimeActive().subscribe({
      next: res=>{
        console.log(res);
        this.movies = res.data;
        this.showtimeService.findByMovie(this.idMovie).subscribe({
          next: res =>{
            console.log(res);
            this.listShowtime = res.data;
            this.selectDate = this.listShowtime[0].date;
            this.showtimeService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
              next: res =>{
                this.timeShowtime = res.data;
                console.log('=====time showtime====');
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
    this.showtimeService.findByMovie(idMovie).subscribe({
      next: res =>{
        console.log(res);
        this.listShowtime = res.data;
        this.selectDate = this.listShowtime[0].date;
        this.showtimeService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
          next: res =>{
            console.log('=====showtime====');
            console.log(res);
            
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
    console.log(this.selectDate);
    this.showtimeService.getShowtimeByMovieAndDate(this.idMovie,this.selectDate).subscribe({
      next: res =>{
        console.log(res);
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

}
