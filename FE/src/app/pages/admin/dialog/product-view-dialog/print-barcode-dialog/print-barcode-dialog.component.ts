import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../../shared/service/product/product.service';
import printJS from "print-js";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { quantity } from 'chartist';

@Component({
  selector: 'app-print-barcode-dialog',
  templateUrl: './print-barcode-dialog.component.html',
  styleUrls: ['./print-barcode-dialog.component.scss']
})
export class PrintBarcodeDialogComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    quantity: ['',[Validators.required, Validators.min(1)]]
  })

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { }

  ngOnInit() {
    
  }
  printQR(){
    let qty = this.formGroup.value.quantity;
    this.productService.generateBarcode(this.dataDialog).subscribe(
        {
          next: resp => {
            let arr = [];
            for (let i = 0; i < qty; i++) {
              arr.push(resp.message);
            }
            printJS({printable: arr ,type: 'image',imageStyle: 'width:100%;margin-bottom:20px;'})
          }
        }
    )

  }
}
