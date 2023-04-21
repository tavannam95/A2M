import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddRowComponent } from '../add-row/add-row.component';
import { RoomService } from 'app/services/room/room.service';
import { RowService } from 'app/services/row/row.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.scss']
})


export class ShowRoomComponent implements OnInit {
  checkAdd = false;
  listRows = [];
  show = [];
  listNewRows = [];
  room = [];
  seatType = [];
  title = '';
  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private roomService: RoomService,
    private rowService: RowService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.title = this.dataDialog.room.name;
    
    this.roomService.getAllSeatType().subscribe({
      next: res=>{
        this.seatType = res.data;
        console.log(this.seatType);
      },
      error: e=>{
        console.log(e);
        
      }
    })
    this.roomService.getOne(this.dataDialog.room.id).subscribe({
      next: res=>{
        let roomRequest = res.data
        this.rowService.getByRoom(roomRequest).subscribe({
          next: res =>{
            this.listRows = res.data;
            this.show = res.data;
            console.log(this.listRows);
            
          },
          error: e=>{
            console.log(e);
            
          }
        })
        
      },
      error: e=>{
        console.log(e);
        
      }
    })
    
  }

  changeNew(indexOfRow: any, indexOfSeat: any,seatType: any){
    console.log(indexOfRow);
    console.log(indexOfSeat);
    console.log(seatType);
    this.listNewRows[indexOfRow].listSeats[indexOfSeat].seatType = seatType;
    // if (seat.seatType.id==4) {
    //   this.toastrService.warning('Không thay đổi thông tin lối đi');
    //   return;
    // }
    // this.roomService.changeSeatType(seat.id,seatType).subscribe({
    //   next: res=>{
    //     console.log(res);
    //   },
    //   error: e=>{
    //     console.log(e);
        
    //   }
    // })
    
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

  addRow(){
    this.matDialog.open(AddRowComponent,{
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: {
        rows: this.listRows,
        newRows: this.listNewRows
      }
    }).afterClosed().subscribe(result =>{
      if (result!='close') {
        let newRow = [] = result;
        for (let i = 0; i < newRow.length; i++) {
          this.listNewRows.push(newRow[i]);
        }
        this.checkAdd = true;
        console.log(this.listNewRows);
      }
      
      
    })
  }

  onSave(){
    console.log(this.listNewRows);
    for (let i = 0; i < this.listNewRows.length; i++) {
      let countNone = 0;
      let listSeat =  this.listNewRows[i].listSeats;
      for (let j = 0; j < listSeat.length; j++) {
        if (listSeat[j].seatType.id!=1&&listSeat[j].seatType.id!=2) {
          this.listNewRows[i].listSeats[j].number = null;
          countNone++;
        }else{
          this.listNewRows[i].listSeats[j].number = j-countNone+1;
        }
      }
    }

    let roomData = {
      roomId: this.dataDialog.room.id,
      data: this.listNewRows
    }

    console.log(roomData);
    this.roomService.create(roomData).subscribe({
      next: res =>{
        console.log(res);
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
    this.checkAdd = false;
  }
}
