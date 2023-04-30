import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constant} from "../../../../../shared/constants/Constant";

@Component({
  selector: 'comfirm-selling',
  templateUrl: './comfirm-selling.component.html',
  styleUrls: ['./comfirm-selling.component.scss']
})
export class ComfirmSellingComponent implements OnInit {

  title = '';
  message = '';
  order:any;

  constructor(
      public dialogRef: MatDialogRef<ComfirmSellingComponent>,
      @Inject(MAT_DIALOG_DATA) public dataDialog?: any,
  ) {
  }

  ngOnInit(): void {
    if (this.dataDialog.order == null){
        this.title = 'Xác nhận thanh toán';
    }else{
      this.title = 'Xác nhận thông tin order'
        this.order = this.dataDialog.order;
    }

  }

  onDismiss(): void {
    this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onConfirm(): void {
    this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CONFIRM);
  }

}
