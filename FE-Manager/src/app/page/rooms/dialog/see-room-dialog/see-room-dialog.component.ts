import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-see-room-dialog',
  templateUrl: './see-room-dialog.component.html',
  styleUrls: ['./see-room-dialog.component.scss']
})
export class SeeRoomDialogComponent implements OnInit {
  title: string = ''; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.title = this.dataDialog.room.name;
  }

}
