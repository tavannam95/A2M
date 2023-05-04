import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  ticket: any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ticket = this.dataDialog.ticket;
  }

}
