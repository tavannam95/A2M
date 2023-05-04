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

  movies: any;

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
      id: id
    };
    this.router.navigate(['/select-movie'],{queryParams: queryParams});
  }

}
