import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailService } from '../../../../../shared/service/order-detail/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import * as e from 'express';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';

@Component({
  selector: 'app-order-exchange',
  templateUrl: './order-exchange.component.html',
  styleUrls: ['./order-exchange.component.scss']
})
export class OrderExchangeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private orderDetailService: OrderDetailService,
    private toastrService: ToastrService,
    private productDetailService: ProductDetailService,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<OrderExchangeComponent>
  ) { }

  ngOnInit() {
  }
  close(data: any){
    this.matDialogRef.close(data);
  }

  acceptExchange(status: any){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có xác nhận trả hàng không?'
      }
  }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (status == 0) {
          this.dataDialog.status= 2;
          this.matDialogRef.close('success');
          this.orderDetailService.updateOrderDetail(this.dataDialog).subscribe({
            next:res=>{
              this.toastrService.success('Xác nhận trả hàng thành công');
              this.matDialogRef.close('success');
            },
            error: e=>{
              this.matDialogRef.close('cancel');
              this.toastrService.error('Xác nhận trả hàng thất bại');
            }
          })
        }else{
          this.dataDialog.status= 2;
          this.dataDialog.productsDetail.quantity += this.dataDialog.quantity;
          this.matDialogRef.close('success');
          this.orderDetailService.updateOrderDetail(this.dataDialog).subscribe({
            next:res=>{
              this.productDetailService.updateProductDetail(this.dataDialog.productsDetail).subscribe({
                next: res=>{
                  this.toastrService.success('Xác nhận trả hàng thành công');
                  this.matDialogRef.close('success');
                },
                error: e=>{
                  this.matDialogRef.close('cancel');
                  this.toastrService.error('Xác nhận trả hàng thất bại');
                }
              });
            },
            error: e=>{
              this.matDialogRef.close('cancel');
              this.toastrService.error('Xác nhận trả hàng thất bại');
            }
          })
          
    
        }
      }
  })
    
  }

}
