import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { ToastrService } from 'ngx-toastr';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { MovieService } from 'app/services/movie/movie.service';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { forkJoin } from 'rxjs';
import { CategoriesService } from 'app/services/categories/categories.service';
import { NationService } from 'app/services/nation/nation.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  allMovie: any;
  isLoading = true;
  nations: any[];
  categories: any[];
  currentDate = new Date();

  displayedColumns: string[] = ['id', 'name', 'poster', 'category', 'nation', 'status', 'func'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
  constructor(
    private matDialog: MatDialog,
    private movieService: MovieService,
    private toastrService: ToastrService,
    private categoriesService: CategoriesService,
    private nationService: NationService,
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin([
      this.categoriesService.getAll(),
      this.movieService.getAll(),
      this.nationService.getAll()
    ]).subscribe( {
      next: res => {
        this.categories = res[0];
        this.handleMovies(res[1]);
        this.nations = res[2];
        this.isLoading = false;
    }, 
    error: (error) => {
      this.isLoading = false;
    }, 
    complete:() => {
      console.log("complete")
    }
    })
  }

  handleMovies(movieData){
    this.dataSource = new MatTableDataSource<any>(movieData);
        this.dataSource.data = movieData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data.forEach((element)=>{
          if (new Date(element.endDate) < this.currentDate) {
            element.status = 0;
          } else if (new Date(element.startDate) > this.currentDate) {
            element.status = 2;
          } else {
            element.status = 1;
          }
        })
  } 

  getAllMovies() {
    this.isLoading = true;
    this.movieService.getAll().subscribe({
      next: res => {
        this.handleMovies(res);
      },
      error: e => {
        console.log(e);
        this.isLoading = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  openDialogForm(type: string, row?: any){
    this.matDialog.open(MovieFormComponent,{
        disableClose: true,
        data:{
          type,
          row,
          categories: this.categories,
          nations: this.nations
        } ,
        width: '700px'
      }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
          // ----------------------After close----------------------
          this.getAllMovies();
          this.isLoading = false;
        }
    })
  }
  seenMovie(row:any){
    this.matDialog.open(MovieDetailComponent,{
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: {
        movies: row
      }
    })
  }

  activeOrInactiveMovie(row: any, title: any){
    // debugger
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn ' + title
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
          this.movieService.activeOrInactive(row).subscribe({
            next: res =>{
              this.toastrService.success(res.message);
              this.getAllMovies();
              this.isLoading = false;
            },
            error: e =>{
              this.toastrService.error('Server đang quá tải vui lòng thử lại sau');
              console.log(e);
              this.isLoading = false;
            }
          });
        }
    })
  }

}
