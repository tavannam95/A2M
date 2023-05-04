import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import { RowService } from 'app/services/row/row.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-row-form-dialog',
  templateUrl: './row-form-dialog.component.html',
  styleUrls: ['./row-form-dialog.component.scss']
})
export class RowFormDialogComponent implements OnInit {
  isLoading: boolean = false;
  formGroup = this.fb.group({
    // id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    quantitySeat:[null, [Validators.required, Validators.min(1)]],
    roomId: null
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private rowService: RowService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<RowFormDialogComponent>,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.formGroup.patchValue({roomId: this.dataDialog.room.id});
  }

  createRow(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn thêm hàng ghế?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
          this.rowService.createRow(this.formGroup.value).subscribe({
            next: res =>{
              this.isLoading = false;
              this.toastrService.success(res.message);
              this.matDialogRef.close('success');
            },
            error: e =>{
              this.isLoading = false;
              this.toastrService.error('Lỗi thêm hàng ghế');
            }
          })
        }
    })
    
    
    
  }

}
