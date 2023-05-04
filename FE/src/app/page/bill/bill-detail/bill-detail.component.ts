import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  bill: any = {};
  currentDate = new Date();
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
  ) { }

  ngOnInit(): void {
    this.bill = this.dataDialog.bill;
    this.bill.movieName = this.bill.listTickets[0].showtime.movie.name;
    this.bill.showDate = this.bill.listTickets[0].showtime.date;
    this.bill.movieTime = this.bill.listTickets[0].showtime.movie.time;
    this.bill.room = this.bill.listTickets[0].seat.row.room.name;
    this.bill.row = this.bill.listTickets[0].seat.row.name;
    this.bill.seat = this.bill.listTickets[0].seat.number;
    this.bill.seatType = this.bill.listTickets[0].seat.seatType.nameVi;

    if (new Date(this.bill.showDate) < this.currentDate) {
      this.bill.status = 0;
    } else {
      this.bill.status = 1;
    }
  }

}
