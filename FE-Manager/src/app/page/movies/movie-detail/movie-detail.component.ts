import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from 'app/services/movie/movie.service';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { Constant } from 'app/constants/Constant';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  title: string = '';
  movie: any = {}
  // dataSource: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog,
    private movieService: MovieService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getMovieDetail();
  }
  getMovieDetail(){
    console.log("data"+this.dataDialog);
    
    this.movieService.getOne(this.dataDialog.movies.id).subscribe({
      next: res=>{
        this.movie = res;
        console.log(this.movie);
        console.log("data"+this.dataDialog);
        this.title = this.dataDialog.movies.name;
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

  openDialogForm(type: string, row?: any){
    this.matDialog.open(MovieFormComponent,{
        disableClose: true,
        data:{
          type,
          row
        } ,
        width: '700px'
      }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
          // ----------------------After close----------------------
          this.getMovieDetail();
        }
    })
  }
}
