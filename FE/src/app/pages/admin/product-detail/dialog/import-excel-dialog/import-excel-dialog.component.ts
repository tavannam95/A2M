import { Component, Inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../../../shared/constants/Constant';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../../../shared/service/color/color.service';

@Component({
  selector: 'app-import-excel-dialog',
  templateUrl: './import-excel-dialog.component.html',
  styleUrls: ['./import-excel-dialog.component.scss']
})
export class ImportExcelDialogComponent implements OnInit {
  excel: any;
  productDetailDto: any = [];
  allColor: any;

  constructor(
    private readonly productDetailService: ProductDetailService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private matDialogRef: MatDialogRef<ImportExcelDialogComponent>
    ) { }

  ngOnInit() {
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.excel = JSON.parse(dataString.slice(dataString.indexOf('['), dataString.lastIndexOf(']')+1))
    }
    reader.readAsBinaryString(file);
  }
  
  openGuideExcel(){
    this.productDetailService.dowloadExcel().subscribe({
      next: res=>{
          const file = new Blob([res], {type: 'application/vnd.ms-excel'});
        const fileURL = URL.createObjectURL(file);
        // window.open(fileURL, '_blank');
        const anchor = document.createElement('a');
        anchor.download = 'File_San_Pham_ID_' + this.dataDialog;
        anchor.href = fileURL;
        anchor.click();
      }
    });
  }

  createProductDetailByXLSX(){
    let check = false;
    if (this.excel == null) {
      this.toastrService.error('Bạn chưa chọn file');
      return;
    }
    for (let i = 0; i < this.excel.length; i++) {
      let colorArr = [];
      let sizeArr = [];

      colorArr = this.excel[i].colorId.split("-");
      this.excel[i].colorId = Number(colorArr[0].trim());

      sizeArr = this.excel[i].sizeId.split("-");
      this.excel[i].sizeId = Number(sizeArr[0].trim());
      
      check = this.checkQuantity(this.excel[i].quantity);
      if (check) {
        return;
      }
    }
    
    

    this.productDetailDto = [];
    for (let i = 0; i < this.excel.length; i++) {
      this.productDetailDto.push({
        product: {id: this.dataDialog},
        color: {id: this.excel[i].colorId},
        size: {id: this.excel[i].sizeId},
        quantity: this.excel[i].quantity
      })
    }

    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn nhập hàng?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.productDetailService.createProductDetail(this.productDetailDto).subscribe({
            next: (res)=>{
              this.toastrService.success('Nhập hàng thành công');
              this.matDialogRef.close();
            },
            error: (err)=>{
              this.toastrService.error('Vui lòng kiểm tra lại file excel');
            }
          })
        }
    })

    
    
  }

  checkQuantity(quantity: number){
    if (quantity<=0) {
      this.toastrService.error('Số lượng phải lớn hơn 0');
      return true;
    }else{
      return false;
    }
  }

}
