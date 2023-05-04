import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'app/services/jwt/jwt.service';
import { PublicApiService } from 'app/services/public/public-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  idMovie: number;
  allDate: any[];
  showtime: any[] = [];
  movie: any = {
    name:'',
    poster: '',
    category: {
      name: ''
    },
    time: '',
    national: {
      nameVi: ''
    },
    startDate: '',
    summary: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicService: PublicApiService,
    private jwtService: JwtService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.idMovie = Number(params.get('movie'));
    });
    this.findMovieById();
    this.findAllDateByMovie();
  }

  selectShowtime(showtimeId: any){
    const queryParams = {
      id: showtimeId
    };
    this.router.navigate(['/select-seat'],{queryParams})
    
  }

  findMovieById(){
    this.publicService.getOneMovie(this.idMovie).subscribe({
      next: res=>{
        this.movie = res;
      },
      error: e =>{
        this.toastrService.warning('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  findAllDateByMovie(){
    this.publicService.getAllDateByMovie(this.idMovie).subscribe({
      next: res =>{
        this.allDate = res.data;
        this.allDate.forEach((date)=>{
           this.getStByMovieDate(date);
        })
      },
      error: e=>{
        this.toastrService.warning('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  checkDate(){
    console.log(this.showtime);
    
  }

  async getStByMovieDate(date: any){
    await this.publicService.getShowtimeByMovieAndDate(this.idMovie,date).subscribe({
      next: res =>{
        let st = res.data;
        this.showtime.push({date: date,st: st});
      },
      error: e =>{
        
        this.toastrService.warning('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  book(){
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/login']);
      this.toastrService.warning('Bạn phải đăng nhập để thực hiện chức năng này');
      return;
    }
    const queryParams = {
      movie: this.idMovie
    };
    this.router.navigate(['/select-movie'],{queryParams: queryParams});
  }

}
