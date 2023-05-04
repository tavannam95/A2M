import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  currentDate: Date = new Date();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.movie = this.dataDialog.movies;
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
        }
    })
  }
}
