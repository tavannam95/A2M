import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JwtService } from 'app/services/jwt/jwt.service';

@Component({
  selector: 'app-showtimes-detail',
  templateUrl: './showtimes-detail.component.html',
  styleUrls: ['./showtimes-detail.component.scss']
})
export class ShowtimesDetailComponent implements OnInit {

  isLoading = false;
  
  messengerUsername: string = 'Không được để trống ô này';
  

  title: string = ''

  formGroup = this.fb.group({
    // id: [''],
    id: [this.dataDialog.row.id],
    nameMovie: [this.dataDialog.row.movie.name],
    Room_id: [this.dataDialog.row.room.id],
    date: [this.dataDialog.row.date],
    timeStart: [this.dataDialog.row.timeStart],
    timeEnd: [this.dataDialog.row.timeEnd],
    createBy: [this.dataDialog.row.createBy],
    updateBy: [this.dataDialog.row.updateBy],
    createDate: [this.dataDialog.row.createDate],
    updateDate: [this.dataDialog.row.updateDate],
  })

  selected: string = 'Female'

  selected_id: string;

  photo: string = (this.dataDialog.row.photo != null)? this.dataDialog.row.photo : '';


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
      private fb: FormBuilder,
      private matDialogRef: MatDialogRef<ShowtimesDetailComponent>,
      private matDialog: MatDialog,
      private jwtService: JwtService
    ) { }

  ngOnInit(): void {
    // console.log(this.dataDialog);
    if (this.dataDialog.type == 'Detail') {
      this.title = 'Xem chi tiết';
    }
    console.log(this.dataDialog.row.photo)
  }

}
