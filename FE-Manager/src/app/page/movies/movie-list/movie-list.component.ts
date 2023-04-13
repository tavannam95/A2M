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

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  allMovie: any;
  isLoading = true;

  displayedColumns: string[] = ['id', 'name', 'poster', 'category', 'nation', 'status', 'func'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private matDialog: MatDialog,
    private movieService: MovieService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllMovie();
  }

  getAllMovie(){
    
    this.isLoading = true;
    this.movieService.getAll().subscribe({
      next: res =>{
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
        this.isLoading = false;
      },
      error: e =>{
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
          row
        } ,
        width: '700px'
      }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
          // ----------------------After close----------------------
          this.getAllMovie();
        }
    })
  }

  activeOrInactiveMovie(row: any, title: any){
    debugger
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn ' + title
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          console.log(row);
          this.isLoading = true;
          this.movieService.activeOrInactive(row).subscribe({
            next: res =>{
              this.toastrService.success(res.message);
              this.isLoading = false;
              this.getAllMovie();
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
