import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Constant } from 'app/constants/Constant';
import { ShowtimeFormComponent } from '../showtime-form/showtime-form.component';
import { ShowtimeService } from 'app/services/showtime/showtime.service';

@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nameMovie', 'room_id', 'date', 'timeStart', 'timeEnd', 'createDate', 'delete','func'];

  constructor(
    private matDialog: MatDialog,
    private showtimesService: ShowtimeService,
  ) { }

  ngOnInit() {
    this.getAllShowtimes();
  }

  getAllShowtimes() {
    this.showtimesService.getAllShowtimes().subscribe({
      next: res => {
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: e => {
        console.log(e);
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


  openDialogForm(type: String, row?: any){
    this.matDialog.open(ShowtimeFormComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '700px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        // ----------------------After close----------------------
      }
    })
  }

}
