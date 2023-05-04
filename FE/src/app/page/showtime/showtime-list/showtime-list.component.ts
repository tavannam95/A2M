import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Constant } from 'app/constants/Constant';
import { ShowtimeFormComponent } from '../showtime-form/showtime-form.component';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
import { ShowtimesDetailComponent } from '../showtimes-detail/showtimes-detail.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nameMovie', 'room_id', 'date', 'timeStart', 'timeEnd', 'createDate', 'delete', 'func'];

  dayArray: string[] = [];

  select_day: string = '';

  roomArray: string[] = []

  select_room: number = 0;

  dataArray: any[] = [];

  constructor(
    private matDialog: MatDialog,
    private showtimesService: ShowtimeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllShowtimes();
  }

  filterDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }

  getAllShowtimes() {
    this.showtimesService.getAllShowtimes().subscribe({
      next: res => {
        res.data.forEach((data) => {
          data.date = new Date(data.date).toLocaleDateString()
          data.timeStart = new Date(data.timeStart).toLocaleDateString() + ' ' + new Date(data.timeStart).toLocaleTimeString('en-US', { hour12: false })
          data.timeEnd = new Date(data.timeEnd).toLocaleDateString() + ' ' + new Date(data.timeEnd).toLocaleTimeString('en-US', { hour12: false })
          data.createDate = new Date(data.createDate).toLocaleDateString()
          data.updateDate = new Date(data.updateDate).toLocaleDateString()
          this.dayArray.push(data.date);
          this.roomArray.push(''+data.room.id);
        })
        this.dayArray = this.filterDuplicates(this.dayArray);
        this.roomArray = this.filterDuplicates(this.roomArray);
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator;
        this.dataArray = res.data;
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
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

  getShowtimes(event: any) {
    if (this.roomArray.includes(event)) {
      if (this.select_day === '') {
        this.dataSource.data = this.dataArray.filter((data) => {
          return (''+data.room.id === event);
        })
      }
      else {
        this.dataSource.data = this.dataArray.filter((data) => {
          return (''+data.room.id === event && data.date === this.select_day);
        })
      }
    }

    else if (this.dayArray.includes(event)) {
      if (this.select_room === 0) {
        this.dataSource.data = this.dataArray.filter((data) => {
          return data.date === event;
        })
      }
      else {
        this.dataSource.data = this.dataArray.filter((data) => {
          return (''+data.room.id === ''+this.select_room && data.date === event);
        })
      }
    }
  }


  openDialogForm(type: String, row?: any) {
    this.matDialog.open(ShowtimeFormComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '2000px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        // ----------------------After close----------------------
        this.getAllShowtimes();
        this.toastrService.success('Thêm mới lịch chiếu thành công');
      }
    })
  }

  openDialogShowtimesView(type: any, row: any){
    this.matDialog.open(ShowtimesDetailComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '2000px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        // ----------------------After close----------------------
      }
    })
  }
}
