import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { RoomService } from 'app/services/room/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss'],
  
})
export class RoomDialogComponent implements OnInit {
  isLoading: boolean = false;

  selected_id: string = '1';
  title: string = 'Add Film';

  dataRoom: any;

  formGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RoomDialogComponent>,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.onInit();
  }

  onInit(){
    // console.log(this.dataDialog);
    if (this.dataDialog.type=='create') {
      this.title = 'Thêm phòng chiếu';
    }
    if (this.dataDialog.type=='update') {
      this.title = 'Sửa phòng chiếu';
      this.dataRoom = this.dataDialog.row;
      console.log(this.dataRoom);
      this.formGroup.patchValue(
          {
            id:this.dataRoom.id,
            name: this.dataRoom.name, 
          }
        );
    }
  }

  onSubmit(){

    if (this.dataDialog.type=='create') {

      this.createRoom();

    }

    if (this.dataDialog.type=='update') {
      
      this.updateRoom();

    }

      
  
  }

  createRoom(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn thêm mới phòng?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
            console.log(this.formGroup.value);
            // this.notificationService.showNotification('success', 'Thêm thành công !');
            this.roomService.createRoom(this.formGroup.value).subscribe({
              next: res =>{
                console.log(res);
                this.toastrService.success(res.message);
                this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.isLoading = false;
              },
              error: e =>{
                console.log(e);
                
              }
            })
        }
    })
  }

  updateRoom(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn cập nhật thông tin phòng?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
            console.log(this.formGroup.value);
            // this.notificationService.showNotification('success', 'Thêm thành công !');
            this.roomService.updateRoom(this.formGroup.value).subscribe({
              next: res =>{
                console.log(res);
                this.toastrService.success(res.message);
                this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.isLoading = false;
              },
              error: e =>{
                console.log(e);
                
              }
            })
        }
    })
  }

}
