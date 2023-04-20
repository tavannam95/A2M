import { Component, OnInit, Inject, } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { ToastrService } from 'ngx-toastr';
import { Regex } from 'app/services/regex/regex';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
import { TableShowtimesDialogComponent } from '../showtime-dialog/table-showtimes-dialog/table-showtimes-dialog.component';

@Component({
  selector: 'app-showtime-form',
  templateUrl: './showtime-form.component.html',
  styleUrls: ['./showtime-form.component.scss']
})


export class ShowtimeFormComponent implements OnInit {

  isLoading = false;

  messengerUsername: string = 'Không được để trống ô này';

  title: string = 'Showtimes'

  // selected_id: string;

  day = new Date();

  day2 = new Date();

  day3 = new Date();

  day4 = new Date();

  day5 = new Date();

  day6 = new Date();

  day7 = new Date();

  select_day: string = '';

  dayArray: string[] = [];

  movies: any[] = [];

  rooms: any[] = [];

  select_movies: any;

  select_room: number;

  selected_showTimes: number;

  dataList: PeriodicElement[] = [];

  time: number = 15 * 60;

  formGroup = this.fb.group({
    // id: [''],
    room_id: [null, [Validators.required]],
    nameMovie: [null, [Validators.required]],
    date: [this.select_day, Validators.required],
    dataArraylist: [],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private toastrService: ToastrService,
    private showtimesService: ShowtimeService
  ) { }

  ngOnInit() {
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day.getFullYear() + '-0' + (this.day.getMonth() + 1) + '-' + this.day.getDate())
    :this.dayArray.push(this.day.getFullYear() + '-' + (this.day.getMonth() + 1) + '-' + this.day.getDate());
    this.day2.setDate(this.day.getDate() + 1);
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day2.getFullYear() + '-0' + (this.day2.getMonth() + 1) + '-' + this.day2.getDate())
    :this.dayArray.push(this.day2.getFullYear() + '-' + (this.day2.getMonth() + 1) + '-' + this.day2.getDate());
    this.day3.setDate(this.day2.getDate() + 1);
    (this.day3.getMonth()+1<10)?this.dayArray.push(this.day3.getFullYear() + '-0' + (this.day3.getMonth() + 1) + '-' + this.day3.getDate())
    :this.dayArray.push(this.day3.getFullYear() + '-' + (this.day3.getMonth() + 1) + '-' + this.day3.getDate());
    this.day4.setDate(this.day3.getDate() + 1);
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day4.getFullYear() + '-0' + (this.day4.getMonth() + 1) + '-' + this.day4.getDate())
    :this.dayArray.push(this.day4.getFullYear() + '-' + (this.day4.getMonth() + 1) + '-' + this.day4.getDate());
    this.day5.setDate(this.day4.getDate() + 1);
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day5.getFullYear() + '-0' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate())
    :this.dayArray.push(this.day5.getFullYear() + '-' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate());
    this.day6.setDate(this.day5.getDate() + 1);
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day5.getFullYear() + '-0' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate())
    :this.dayArray.push(this.day5.getFullYear() + '-' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate());
    this.day7.setDate(this.day6.getDate() + 1);
    (this.day.getMonth()+1<10)?this.dayArray.push(this.day6.getFullYear() + '-0' + (this.day6.getMonth() + 1) + '-' + this.day6.getDate())
    :this.dayArray.push(this.day6.getFullYear() + '-' + (this.day6.getMonth() + 1) + '-' + this.day6.getDate());
    this.getRoom();
  }


  onSubmit(formGroup = this.formGroup) {
    this.matDialog.open(TableShowtimesDialogComponent, {
      disableClose: true,
      data: {
        formGroup
      },
      width: '2000px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        // ----------------------After close----------------------
      }
    })
  }

  getMovie(event: any) {
    console.log(event)
    this.showtimesService.getMoviesByDate(event).subscribe({
      next: res => {
        this.movies = res.data
        console.log(this.movies);
      }
    })
  }

  getRoom() {
    this.showtimesService.getAllRooms().subscribe({
      next: res => {
        this.rooms = res.data;
      }
    })
  }

  data1: any[];
  id: number = 1;
  addShowtimes() {
    this.data1 = this.movies.filter(data => '' + data.id === this.select_movies);
    if (this.time - this.data1[0].time >= 0) {
      this.dataList.push({ id: this.id, room_id: this.select_room, movie_id: this.select_movies, time: this.data1[0].time, nameMovie: this.data1[0].name })
      this.formGroup.value.dataArraylist = this.dataList
      this.time = this.time - this.data1[0].time - 15;
    }
    else {
      this.toastrService.warning("Time don't enough to add to showtimes")
    }
    (this.id)++;
  }

  getDelete(dataIn4: any) {
    this.dataList = this.dataList.filter(function (data) {
      return data.id !== dataIn4.id;
    })
    console.log(this.dataList);
    this.formGroup.value.dataArraylist = this.dataList;
    this.time = this.time + 15 + dataIn4.time;
  }
}

export interface PeriodicElement {
  id: number;
  room_id?: number;
  movie_id: number;
  nameMovie?: string;
  time?: number
}
