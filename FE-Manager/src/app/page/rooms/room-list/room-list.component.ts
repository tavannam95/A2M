import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { RoomDialogComponent } from '../dialog/room-dialog/room-dialog.component';
import { RoomService } from 'app/services/room/room.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SeeRoomDialogComponent } from '../dialog/see-room-dialog/see-room-dialog.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  allRoom: any;
  isLoading = false;
  
  displayedColumns: string[] = ['id', 'name', 'isDelete', 'func'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private matDialog: MatDialog,
    private roomService: RoomService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRoom();
  }

  getAllRoom(){
    this.isLoading = true;
    this.roomService.getAll().subscribe({
      next: res =>{
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
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

  openDialogForm(type: string, row?: any){
    this.matDialog.open(RoomDialogComponent,{
        disableClose: true,
        data:{
          type,
          row
        } ,
        width: '700px'
      }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
          // ----------------------After close----------------------
          this.getAllRoom();
        }
    })
  }

  activeOrInactiveRoom(row: any, title: any){

    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn ' + title
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          console.log(row);
          this.isLoading = true;
          this.roomService.activeOrInactive(row).subscribe({
            next: res =>{
              this.toastrService.success(res.message);
              this.isLoading = false;
              this.getAllRoom();
            },
            error: e =>{
              this.toastrService.error('Server đang quá tải vui lòng thử lại sau');
              console.log(e);
              this.isLoading = false;
            }
          });
        }
    })
  }

  seenRoom(row:any){
    this.matDialog.open(SeeRoomDialogComponent,{
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: {
        room: row
      }
    })
  }
}
