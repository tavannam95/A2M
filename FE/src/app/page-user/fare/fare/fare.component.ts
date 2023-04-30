import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FareService } from 'app/services/fare/fare.service';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent implements OnInit {

  isLoading = true;

  price: any = [{
  standardNormal: 0,
  vipNormal: 0,
  standardHoliday: 0,
  vipHoliday: 0
}];
  displayedColumns: string[] = ['standardNormal', 'vipNormal', 'standardHoliday', 'vipHoliday'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private fareService: FareService,
  ) { }

  ngOnInit(): void {
    this.getAllFare();

  }

  getAllFare() {
    this.isLoading = true;
    this.fareService.getAll().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
        this.dataSource.data.forEach((element)=>{
          if (element.isHoliday == false && element.seatType == 1) {
            this.price.standardNormal = element.price;
          } else if (element.isHoliday == false && element.seatType == 2) {
            this.price.vipNormal = element.price;
          } else if (element.isHoliday == true && element.seatType == 1) {
            this.price.standardHoliday = element.price;
          } else if (element.isHoliday == true && element.seatType == 2) {
            this.price.vipHoliday = element.price;
          }
        })
        console.log(this.price);
        
        this.isLoading = false;
      },
      error: e => {
        console.log(e);
        this.isLoading = false;
      }
    })
  }
}
