import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
import { timeEnd } from 'console';


@Component({
  selector: 'app-table-showtimes-dialog',
  templateUrl: './table-showtimes-dialog.component.html',
  styleUrls: ['./table-showtimes-dialog.component.scss']
})
export class TableShowtimesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TableShowtimesDialogComponent>,
    private matDialog: MatDialog,
    private toastrService: ToastrService,
    private showtimesService: ShowtimeService
  ) { }

  isLoading = false;
  
  title: string = ''+this.dataDialog.formGroup.value.date;

  timeStart = new Date(''+this.title);

  displayedColumns: string[] = ['movie', 'rooms', 'date', 'timeStart', 'timeEnd', 'createDate'];

  schedule: showtimes[] = [];

  dataSource
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    console.log(this.dataDialog);
    this.getSchedule();
  }

  getSchedule(){
    // let a: number = this.timeStart.getMinutes() + 9*60;
    let createdate = new Date();
    let dateStart = new Date(''+this.title);
    dateStart.setHours(9);
    let dateEnd = new Date(dateStart);
    this.dataDialog.formGroup.value.dataArraylist.forEach(element => {
      console.log(dateStart.toUTCString());

      console.log(dateEnd.toUTCString());

      dateEnd.setTime(dateStart.getTime()+element.time*60*1000);

      let start: string = '' + dateStart.getFullYear() + '-'+ (((dateStart.getMonth()+1)>10)?((dateStart.getMonth()+1)):('0' + (dateStart.getMonth()+1))) + '-' + dateStart.getDate();
      
      let end: string = '' + dateEnd.getFullYear() + '-'+ (((dateEnd.getMonth()+1)>10)?((dateEnd.getMonth()+1)):('0' + (dateEnd.getMonth()+1))) + '-' + dateEnd.getDate();
      
      let create: string = '' + createdate.getFullYear() + '-'+ (((createdate.getMonth()+1)>10)?((createdate.getMonth()+1)):('0' + (createdate.getMonth()+1))) + '-' + createdate.getDate();
      
      let date: string = '' + this.timeStart.getFullYear() + '-'+ (((this.timeStart.getMonth()+1)>10)?((this.timeStart.getMonth()+1)):('0' + (this.timeStart.getMonth()+1))) + '-' + this.timeStart.getDate();
      
      this.schedule.push({rooms: {id: element.room_id}, movie: {id: element.movie_id},  timeStart: start+' '+dateStart.toLocaleTimeString().slice(0,-3), timeEnd: end+' '+dateEnd.toLocaleTimeString().slice(0,-3), createDate: create, date: date})
      
      dateStart.setTime(dateEnd.getTime()+15*60*1000)
    
    });
    
    console.log(this.schedule)
    
    this.dataSource = this.schedule;
  }

  onSubmit(){
    this.dataSource.forEach((data) => {
      console.log(data);
      this.showtimesService.saveShowtime(data).subscribe({
        next: res => {
          this.matDialogRef.close()
          if(res.status===true){
            this.toastrService.success(res.message);
            this.isLoading = false;
          }
          else{
            this.isLoading = false;
            this.toastrService.warning(res.message);
          }
        }
      }
      )
    })
    console.log(this.dataSource)
  }
}

export interface showtimes {
  movie: {id: number};
  rooms: {id: number};
  // nameMovie?: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
  createDate?: string;
}

