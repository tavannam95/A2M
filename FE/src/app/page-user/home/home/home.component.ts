import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'app/services/jwt/jwt.service';
import { PublicApiService } from 'app/services/public/public-api.service';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  checkTab = true;
  movies: any;
  upcomingMovie: any;

  constructor(
    private showtimeService: ShowtimeService,
    private router: Router,
    private publicApi: PublicApiService,
    private jwtService: JwtService,
    private toastrServcie: ToastrService
  ) { }

  ngOnInit() {
    this.publicApi.today().subscribe({
      next: res =>{
        this.movies = res.data;
        if (this.movies.length==0) {
          this.checkTab = false;
        }
      },
      error: e =>{
        this.toastrServcie.error('Lỗi hệ thống, vui lòng thử lại sau');
        
      }
    })
    this.publicApi.upcomingMovie().subscribe({
      next: res =>{
        this.upcomingMovie = res.data;
      },
      error: e =>{
        this.toastrServcie.error('Lỗi hệ thống, vui lòng thử lại sau');
        
      }
    })
  }

  book(id: number){
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/login']);
      this.toastrServcie.warning('Bạn phải đăng nhập để thực hiện chức năng này');
      return;
    }
    const queryParams = {
      movie: id
    };
    this.router.navigate(['/select-movie'],{queryParams: queryParams});
  }

  movieDetail(id: number){
    const queryParams = {
      movie: id
    };
    this.router.navigate(['/movie-detail'],{queryParams: queryParams});
  }

}
