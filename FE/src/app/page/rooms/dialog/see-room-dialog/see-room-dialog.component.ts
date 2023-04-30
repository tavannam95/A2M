import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RowFormDialogComponent } from '../row-form-dialog/row-form-dialog.component';
import { RoomService } from 'app/services/room/room.service';
import { RowService } from 'app/services/row/row.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Constant } from 'app/constants/Constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-see-room-dialog',
  templateUrl: './see-room-dialog.component.html',
  styleUrls: ['./see-room-dialog.component.scss']
})
export class SeeRoomDialogComponent implements OnInit {
  title: string = '';
  listRows: any;
  seatType: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog,
    private roomService: RoomService,
    private rowService: RowService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.title = this.dataDialog.room.name;
    this.getOneRoom();
    this.getRow();
    this.getAllSeatType();
  }

  getAllSeatType(){
    this.roomService.getAllSeatType().subscribe({
      next: res=>{
        this.seatType = res.data;
        console.log(this.seatType);
      },
      error: e=>{
        console.log(e);
        
      }
    })
  }

  change(seat: any,seatType: any){
    console.log(seat.id);
    console.log(seatType);
    // if (seat.seatType.id==4) {
    //   this.toastrService.warning('Không thay đổi thông tin lối đi');
    //   return;
    // }
    this.roomService.changeSeatType(seat.id,seatType).subscribe({
      next: res=>{
        console.log(res);
        this.toastrService.success(res.message);
        this.getRow();
      },
      error: e=>{
        console.log(e);
        
      }
    })
    
  }

  getRow(){
    this.rowService.getByRoom(this.dataDialog.room).subscribe({
      next: res=>{
        this.listRows = res.data;
        console.log(this.listRows);
      },
      error: e=>{
        console.log(e);
        
      }
    })
  }

  activeOrInactive(data: any){
    console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn xóa hàng ghế?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.rowService.activeOrInactive(data).subscribe({
            next: res=>{
              console.log(res);
              this.getRow();
              this.toastrService.success(res.message);
            },
            error: e=>{
              console.log(e);
              this.toastrService.error('Lỗi xóa hàng ghế');
            }
          })
        }
    })
    
  }

  openAddRow(){
    this.matDialog.open(RowFormDialogComponent,{
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: {
        room: this.dataDialog.room
      }
    }).afterClosed().subscribe(result=>{
      if (result=='success') {
        this.getRow();
      }
    })
  }

  getOneRoom(){
    this.roomService.getOne(this.dataDialog.room.id).subscribe({
      next: res=>{
        console.log(res);
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

}
