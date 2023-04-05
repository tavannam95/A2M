import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {

  title: string = 'Phòng chiếu';
  formGroup = this.fb.group({
    // id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    quantitySeat: ['', Validators.required],
    quantityRow: ['', Validators.required],
})

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RoomDialogComponent>,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    if (this.dataDialog.type=='create') {
      this.title = 'Thêm phòng chiếu';
    }
    if (this.dataDialog.type=='update') {
      this.title = 'Sửa phòng chiếu';
    }
  }

  onSubmit(){
    
      this.matDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
            message: 'Bạn có muốn thêm mới phòng?'
        }
      }).afterClosed().subscribe(result => {
          if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
              console.log(this.formGroup.value);
          }
      })
  
  }

}
