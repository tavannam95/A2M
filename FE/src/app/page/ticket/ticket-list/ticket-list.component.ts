import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'app/services/ticket/ticket.service';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  isLoading = true;
  

  displayedColumns: string[] = ['ticketId', 'movieName', 'showtime', 'seat', 'fare', 'func'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private matDialog: MatDialog,
    private ticketService: TicketService,
  ) { }

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets(){
    
    this.isLoading = true;
    this.ticketService.getAll().subscribe({
      next: res =>{
        // debugger
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

  seenTicket(row:any){
    this.matDialog.open(TicketDetailComponent,{
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: {
        ticket: row
      }
    })
  }
}
