import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Seat{
  number: number;
  location: number;
  rowId: number;
  // seatTypeId: number;
  status: number;
  seatType: SeatType
}

export interface SeatType{
  id: number;
  name: string;
  img: string;
}

const seat1: SeatType = {
  id: 1,
  name: 'Ghế thường',
  img: 'https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf%20th%C6%B0%E1%BB%9Dng.jpg'
}

const seat2: SeatType = {
  id: 2,
  name: 'Ghế vip',
  img: 'https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg'
}

const seat3: SeatType = {
  id: 3,
  name: 'Cột',
  img: 'https://res.cloudinary.com/amenica2m/image/upload/v1681705286/a8iz6k8tcjzftml2swzh.png'
}

const seat4: SeatType = {
  id: 4,
  name: 'Lối đi',
  img: 'https://res.cloudinary.com/amenica2m/image/upload/v1681704963/dpkabbnff3e3wqdyx6hs.png'
}

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent implements OnInit {

  nameRow = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  room = [];

  row = {
    name: '',
    seat: []
  };
  seat = {
    location: null,
    seatType: seat1
  };

  formGroup = this.fb.group({
    id: [''],
    quantityRow: ['', [Validators.required, Validators.min(1)]],
    quantitySeat: ['', [Validators.required, Validators.min(1)]],
  })

  oldRows = [];
  newRows = [];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddRowComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
  ) { }

  ngOnInit() {
    this.oldRows = this.dataDialog.rows;
    this.newRows = this.dataDialog.newRows;
  }

  create(){
    this.room = [];
    for (let i = 0; i < Number(this.formGroup.value.quantityRow); i++) {
      // this.row.name = this.nameRow[i];
      let row = {
        name: this.nameRow[this.oldRows.length + this.newRows.length + i],
        listSeats: []
      }
      this.room.push(row);
      for (let j = 0; j < Number(this.formGroup.value.quantitySeat); j++) {
        let seat = {
          location: j,
          seatType: seat1
        }
        row.listSeats.push(seat);
      }
    }
    this.matDialogRef.close(this.room);
  }

  close(){
    this.matDialogRef.close('close');
  }

}
