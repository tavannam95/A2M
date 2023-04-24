import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowtimeService } from 'app/services/showtime/showtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: any;

  constructor(
    private showtimeService: ShowtimeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showtimeService.today().subscribe({
      next: res =>{
        this.movies = res.data;
        console.log(this.movies);
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

  book(id: number){
    const queryParams = {
      id: id
    };
    this.router.navigate(['/select-movie'],{queryParams});
  }

}
