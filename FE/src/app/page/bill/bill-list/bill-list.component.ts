import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BillService } from 'app/services/bill/bill.service';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';
import { TicketService } from 'app/services/ticket/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  currentDate = new Date();
  isLoading = true;
  
  // showDate = new Date();
  displayedColumns: string[] = ['billCode', 'email', 'showDate', 'totalPrice', 'status', 'func'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private matDialog: MatDialog,
    private billService: BillService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    // this.getAllTicket();
    this.getAllBills();
  } 

  getAllBills() {
    this.isLoading = true;
    this.billService.getAll().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length > 0){

          this.dataSource.data.forEach((element) => {
            element.showDate = element.listTickets[0].showtime.date;
        })
        this.dataSource.data.forEach((element) => {
          if (new Date(element.showDate) < this.currentDate) {
            element.status = 0;
          } else {
            element.status = 1;
          }
        })
        }
        
        this.isLoading = false;
      },
      error: e => {
        this.isLoading = false;
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

  seenBill(row: any) {
    this.matDialog.open(BillDetailComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: {
        bill: row
      }
    })
  }

}
