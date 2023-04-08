import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RowFormDialogComponent } from '../row-form-dialog/row-form-dialog.component';

@Component({
  selector: 'app-see-room-dialog',
  templateUrl: './see-room-dialog.component.html',
  styleUrls: ['./see-room-dialog.component.scss']
})
export class SeeRoomDialogComponent implements OnInit {
  title: string = ''; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.title = this.dataDialog.room.name;
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

}
