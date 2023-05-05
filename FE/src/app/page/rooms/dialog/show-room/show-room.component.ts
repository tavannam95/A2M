import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRowComponent } from '../add-row/add-row.component';
import { RoomService } from 'app/services/room/room.service';
import { RowService } from 'app/services/row/row.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.scss']
})


export class ShowRoomComponent implements OnInit {
  isLoading = false;
  checkAdd = false;
  listRows = [];
  listSelectNew = [];
  show = [];
  listNewRows = [];
  room = [];
  seatType = [];
  seatTypeAll = [];
  seatTypeNew = [];
  title = '';
  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private roomService: RoomService,
    private rowService: RowService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<ShowRoomComponent>
  ) { }

  ngOnInit() {
    this.title = this.dataDialog.room.name;

    this.roomService.getAllSeatType().subscribe({
      next: res => {
        this.seatType = res.data;
        this.seatTypeNew = res.data;
        this.seatType = this.seatType.slice(0,2);
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
    
    this.getData();
  }

  getData(){
    this.roomService.getOne(this.dataDialog.room.id).subscribe({
      next: res => {
        let roomRequest = res.data
        this.rowService.getByRoom(roomRequest).subscribe({
          next: res => {
            this.listRows = res.data;
            this.show = res.data;

          },
          error: e => {
            this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
          }
        })

      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  changeNew(indexOfRow: any, indexOfSeat: any, seatType: any) {
    this.listNewRows[indexOfRow].listSeats[indexOfSeat].seatType = seatType;
  }

  changeType(seatType: any){
    for (let i = 0; i < this.listSelectNew.length; i++) {
      this.listNewRows[this.listSelectNew[i].indexOfRow].listSeats[this.listSelectNew[i].indexOfSeat].seatType = seatType;
    }
    this.listSelectNew = [];    
  }

  checkListSelectNew(){
    if (this.listSelectNew.length>0) {
      return true;
    }
    return false;
  }

  selectNew(indexOfRow: any, indexOfSeat: any){
    let seatRow = {};
    seatRow = {
      indexOfRow,
      indexOfSeat
    };
    let index = -1;

    for (let i = 0; i < this.listSelectNew.length; i++) {
      if (this.listSelectNew[i].indexOfRow == indexOfRow && this.listSelectNew[i].indexOfSeat == indexOfSeat) {
        index = i;
        break;
      }      
    }
    if (index==-1) {
      this.listSelectNew.push(seatRow);
    }else{
      this.listSelectNew.splice(index,1);
    }
  }

  checkSelect(indexOfRow: any,indexOfSeat: any){
    for (let i = 0; i < this.listSelectNew.length; i++) {
      if (this.listSelectNew[i].indexOfRow == indexOfRow && this.listSelectNew[i].indexOfSeat == indexOfSeat) {
        return true;
      }
    }
    return false;
  }

  change(seat: any, seatType: any) {
    this.roomService.changeSeatType(seat.id, seatType).subscribe({
      next: res => {
        this.toastrService.success(res.message);
        this.getRow();
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })

  }

  getRow() {
    this.rowService.getByRoom(this.dataDialog.room).subscribe({
      next: res => {
        this.listRows = res.data;
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  removeAllSeat(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Xóa tất cả ghế của phòng?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.roomService.removeAll(this.dataDialog.room.id).subscribe({
          next: res =>{
            this.toastrService.success(res.message);
            this.getData();
          },
          error: e =>{
            this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
          }
        })
      }
    })
  }

  addRow() {
    this.matDialog.open(AddRowComponent, {
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: {
        rows: this.listRows,
        newRows: this.listNewRows
      }
    }).afterClosed().subscribe(result => {
      if (result != 'close') {
        let newRow = [] = result;
        for (let i = 0; i < newRow.length; i++) {
          this.listNewRows.push(newRow[i]);
        }
        this.checkAdd = true;
      }


    })
  }

  onSave() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Lưu thay đổi?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.isLoading = true;
        for (let i = 0; i < this.listNewRows.length; i++) {
          let countNone = 0;
          let listSeat = this.listNewRows[i].listSeats;
          for (let j = 0; j < listSeat.length; j++) {
            if (listSeat[j].seatType.id != 1 && listSeat[j].seatType.id != 2) {
              this.listNewRows[i].listSeats[j].number = null;
              countNone++;
            } else {
              this.listNewRows[i].listSeats[j].number = j - countNone + 1;
            }
          }
        }

        let roomData = {
          roomId: this.dataDialog.room.id,
          data: this.listNewRows
        }

        this.roomService.create(roomData).subscribe({
          next: res => {
            this.checkAdd = false;
            this.toastrService.success(res.message);
            this.listNewRows = [];
            this.getRow();
            this.isLoading = false;
          },
          error: e => {
            this.isLoading = false;
            this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
          }
        })
      }
    })


  }

  activeOrInactive(data: any){
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
              this.getRow();
              this.toastrService.success(res.message);
            },
            error: e=>{
              this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
            }
          })
        }
    })
    
  }

  cancelAddRow() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Hủy thao tác thêm hàng ghế?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.checkAdd = false;
        this.listNewRows = [];
      }
    })

  }

  close() {
    this.matDialogRef.close();
  }
}
