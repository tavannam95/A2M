import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RowFormDialogComponent } from '../row-form-dialog/row-form-dialog.component';
import { RoomService } from 'app/services/room/room.service';
import { RowService } from 'app/services/row/row.service';

@Component({
  selector: 'app-see-room-dialog',
  templateUrl: './see-room-dialog.component.html',
  styleUrls: ['./see-room-dialog.component.scss']
})
export class SeeRoomDialogComponent implements OnInit {
  title: string = ''; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog,
    private roomService: RoomService,
    private rowService: RowService
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.title = this.dataDialog.room.name;
    this.getOneRoom();
    this.getRow();
  }

  getRow(){
    this.rowService.getByRoom(this.dataDialog.room).subscribe({
      next: res=>{
        console.log(res);
        
      },
      error: e=>{
        console.log(e);
        
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
