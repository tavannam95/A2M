import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Regex } from '../../../../shared/validators/Regex';
import { ColorService } from '../../../../shared/service/color/color.service';
import { ToastrService } from 'ngx-toastr';
import { TrimService } from '../../../../shared/service/trim/trim.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../shared/constants/Constant';

@Component({
  selector: 'app-color-create-dialog',
  templateUrl: './color-create-dialog.component.html',
  styleUrls: ['./color-create-dialog.component.scss']
})
export class ColorCreateDialogComponent implements OnInit {

  files: File[] = [];

  colorFormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.pattern(Regex.unicode)]],
    code: ['', [Validators.required, Validators.pattern(Regex.codeColor)]],
  })

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private trimService: TrimService,
    private matDialogRef: MatDialogRef<ColorCreateDialogComponent>,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  createColor(){
    this.trimService.inputTrim(this.colorFormGroup,['name','code']);
    
    this.colorFormGroup.markAllAsTouched();
    if (this.colorFormGroup.invalid) {
      return;
    }
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn thêm mới màu sắc?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.colorService.createColor(this.colorFormGroup.value).subscribe({
            next: (res) =>{
              this.matDialogRef.close('submit');
              this.toastrService.success('Thêm màu sắc thành công');
            },
            error: (err) =>{
              this.toastrService.error('Thêm màu sắc thất bại')
            }
          })
        }
    })
    
  }

  cancel(){
    this.matDialogRef.close('cancel');
  }


  onChangeColor(event){
    this.colorFormGroup.patchValue({code: event.target.value});
  }
  //Select image
	onSelect(event) {
    if(this.files){
      this.files.splice(0,1);
    }
		this.files.push(...event.addedFiles);
    
	}
  //Remove image
	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}
}
