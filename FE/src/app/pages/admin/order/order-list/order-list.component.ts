import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PreparingProductComponent } from '../dialog/preparing-product/preparing-product.component';
import { GhnService } from '../../../../shared/service/ghn/ghn.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { TrimService } from '../../../../shared/service/trim/trim.service';
import { OrderExchangeComponent } from '../dialog/order-exchange/order-exchange.component';
import { ExchangeService } from '../../../../shared/service/exchange/exchange.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  badge = 0;

  isLoading: boolean = false;
  tabIndex: number = 0;
  allOrder: any[] = [];
  allOrderStatus: any[] = [];
  status: any;
  totalPage: any;
  orderGhn: any[] = [];
  dateShift: any[] = [];
  listStatus: string[] = [
    'Chờ xác nhận',
    'Chờ lấy hàng',
    'Đang giao',
    'Đã giao',
    'Đơn hủy',
    'Trả hàng/Hoàn tiền',
    'Bán tại cửa hàng',
    'Tất cả',
  ]

  dataOrder: any[] = [];

  searchOrderDTO = this.fb.group({
    fullName: [''],
    id: null,
    orderCode: [''],
    status: null
  })

  //Paginator
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private ghnService: GhnService,
    private orderSevice: OrderService,
    private fb: FormBuilder,
    private trimService: TrimService,
    private exchangeService: ExchangeService
  ) { }

  ngOnInit() {
    this.getDataOrder();
    this.getDate();
    this.checkBadge();
  }

  setDefaultSearchDTO(){
    this.searchOrderDTO = this.fb.group({
      fullName: [''],
      id: null,
      orderCode: [''],
      status: null
    })
  }

  setDefaultPageEvent(){
    this.pageSize = 10;
    this.pageIndex = 0;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.handlePage();
  }

  handlePage(){
    this.trimService.inputTrim(this.searchOrderDTO,['fullName','orderCode']);
    this.searchOrderDTO.patchValue({status:this.tabIndex});
    this.orderService.searchOrder(this.searchOrderDTO.value, this.pageIndex, this.pageSize).subscribe({
      next: (res)=>{
        if (res.length<=0) {
          this.toastrService.warning('Đơn hàng không tồn tại');
        }
        if (this.tabIndex == 5) {
          this.badge = 0;
          this.allOrder = res;
            for (let i = 0; i < this.allOrder.length; i++) {
              for (let j = 0; j < this.allOrder[i].orderDetailsList.length; j++) {
                // console.log(this.allOrder[i].orderDetailsList[j]);
                
                if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 0) {
                  this.allOrder[i].orders.status = 8;
                  this.badge ++;
                  break;
                }
                if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 1) {
                  this.allOrder[i].orders.status = 9;
                  break;
                }
              }
              
            }
            
            if (this.allOrder.length>0) {
              this.totalPage = this.allOrder[0].totalPage;
              this.length = this.allOrder[0].totalElements;
            }
        }else{
          this.allOrder = res;
          if (this.allOrder.length>0) {
            this.totalPage = this.allOrder[0].totalPage;
            this.length = this.allOrder[0].totalElements;
          }
        }
      },
      error: (e)=>{
        console.log(e);
        
      }
    })
  }

  searchOrder(){
    
    this.trimService.inputTrim(this.searchOrderDTO,['fullName','orderCode']);
    this.searchOrderDTO.patchValue({status:this.tabIndex});
    this.orderService.searchOrder(this.searchOrderDTO.value, this.pageIndex, this.pageSize).subscribe({
      next: (res)=>{
        if (res.length<=0) {
          this.toastrService.warning('Đơn hàng không tồn tại');
        }
        if (this.tabIndex == 5) {
          this.badge = 0;
          this.setDefaultPageEvent();
          this.allOrder = res;
            for (let i = 0; i < this.allOrder.length; i++) {
              for (let j = 0; j < this.allOrder[i].orderDetailsList.length; j++) {
                // console.log(this.allOrder[i].orderDetailsList[j]);
                
                if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 0) {
                  this.allOrder[i].orders.status = 8;
                  this.badge ++;
                  break;
                }
                if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 1) {
                  this.allOrder[i].orders.status = 9;
                  break;
                }
              }
              
            }
            
            if (this.allOrder.length>0) {
              this.totalPage = this.allOrder[0].totalPage;
              this.length = this.allOrder[0].totalElements;
            }
        }else{
          this.setDefaultPageEvent();
          this.allOrder = res;
          if (this.allOrder.length>0) {
            this.totalPage = this.allOrder[0].totalPage;
            this.length = this.allOrder[0].totalElements;
          }
        }
      },
      error: (e)=>{
        console.log(e);
        
      }
    })
  }

  openExchange(order: any){
    this.matDialog.open(OrderExchangeComponent,{
      disableClose: true,
      width: '800px'
    })
  }

  selectTab(index: any){
    this.setDefaultSearchDTO();
    this.badge = 0;
    this.tabIndex = index;
    if (this.tabIndex==0) {
      this.searchOrderDTO.patchValue({orderCode:''});
    }
    if (index == 5) {

      this.setDefaultPageEvent();
      this.orderService.findExchange(this.pageIndex,this.pageSize).subscribe({
        next: res=>{
          this.allOrder = res;
          for (let i = 0; i < this.allOrder.length; i++) {
            for (let j = 0; j < this.allOrder[i].orderDetailsList.length; j++) {
              // console.log(this.allOrder[i].orderDetailsList[j]);
              
              if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 0) {
                this.allOrder[i].orders.status = 8;
                this.badge ++;
                break;
              }
              if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 1) {
                this.allOrder[i].orders.status = 9;
                break;
              }
            }
            
          }
          
          this.orderService.findAllExchange().subscribe({
            next: res=>{
              this.length = res.length;
            }
          })
        }
      });
    }else if (index == 7) {
      this.setDefaultPageEvent();
      this.getAllOrder(0);
      this.checkBadge();
    }else{
      this.checkBadge();
      this.orderService.findAllByStatus(this.tabIndex).subscribe(res=>{
        this.allOrderStatus = res;
        this.length = this.allOrderStatus.length;
      })
      this.setDefaultPageEvent();
      this.findByStatus(this.tabIndex);
    }
  }

  checkBadge(){
    this.badge = 0;
    this.orderService.findExchange(this.pageIndex,this.pageSize).subscribe({
      next: res=>{
        let r;
        r = res;
        for (let i = 0; i < r.length; i++) {
          for (let j = 0; j < r[i].orderDetailsList.length; j++) {
            // console.log(this.allOrder[i].orderDetailsList[j]);
            if (r[i].orderDetailsList[j].exchanges != null && r[i].orderDetailsList[j].exchanges.status == 0) {
              this.badge ++;
              break;
            }
          }
          
        }
      }
    });
  }
  
  getDate(){
    this.ghnService.getDate().subscribe({
      next: (res)=>{
        this.dateShift = res.data;
      }
    })
  }

  openPreparingDialog(data: any, dateShift: any, tabIndex: any){
    
    let exchange;
    if (this.tabIndex == 5) {
      this.exchangeService.findByOrderId(data.orders.id).subscribe({
        next: res=>{
          exchange = res;
          this.matDialog.open(PreparingProductComponent,{
            width: '1000px',
            disableClose: true,
            autoFocus: false,
            data: {
              data,
              dateShift,
              tabIndex,
              exchange: exchange
            }
          }).afterClosed().subscribe(res=>{
            if (res == 'OK') {
              if (this.tabIndex == 5) {
              
                this.orderService.findExchange(this.pageIndex,this.pageSize).subscribe({
                  next: res=>{
                    this.badge = 0;
                    this.allOrder = res;
                    for (let i = 0; i < this.allOrder.length; i++) {
                      for (let j = 0; j < this.allOrder[i].orderDetailsList.length; j++) {
                        // console.log(this.allOrder[i].orderDetailsList[j]);
                        
                        if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 0) {
                          this.allOrder[i].orders.status = 8;
                          this.badge ++;
                          break;
                        }
                        if (this.allOrder[i].orderDetailsList[j].exchanges != null && this.allOrder[i].orderDetailsList[j].exchanges.status == 1) {
                          this.allOrder[i].orders.status = 9;
                          break;
                        }
                      }
                      
                    }
                    
                    this.orderService.findAllExchange().subscribe({
                      next: res=>{
                        this.length = res.length;
                      }
                    })
                  }
                });

              }else if (this.tabIndex==7) {
                this.checkBadge();
                this.getAllOrder(0);
              }else{
                this.checkBadge();
                this.orderService.findByStatus(this.tabIndex, this.pageIndex, this.pageSize).subscribe(res=>{
                  this.allOrder = res;
                });
              }
            }
          });
        }
      })
    }else{
      this.matDialog.open(PreparingProductComponent,{
        width: '1000px',
        disableClose: true,
        autoFocus: false,
        data: {
          data,
          dateShift,
          tabIndex,
        }
      }).afterClosed().subscribe(res=>{
        if (res == 'OK') {
          if (this.tabIndex==7) {
            this.getAllOrder(0);
          }else{
            this.orderService.findByStatus(this.tabIndex, this.pageIndex, this.pageSize).subscribe(res=>{
              this.allOrder = res;
            });
          }
        }
      });
    }
  }

  findByStatus(index: any){
    if (index==-1) {
      this.getAllOrder(0);
    }else{
      this.isLoading = true;
      this.orderService.findByStatus(index, this.pageIndex, this.pageSize).subscribe({
        next:(res)=>{
          this.allOrder = res;
          this.isLoading = false;
        },
        error:(e)=>{
          console.log(e);
          this.toastrService.error('Server đang quá tải');
          this.isLoading = false;
        }
      })
    }
  }

  getDataOrder(){
    this.orderService.findAllByStatus(this.tabIndex).subscribe(res=>{
      this.allOrderStatus = res;
      this.length = this.allOrderStatus.length;
    })
    this.setDefaultPageEvent();
    this.findByStatus(this.tabIndex);
  }

  setLengthAllOrder(){
    let arr = [];
    this.orderService.getDataOrder().subscribe(res=>{
      arr = res;
      this.length = arr.length;
    })
  }

  getAllOrder(page: any){
    this.isLoading = true;
    this.setLengthAllOrder();
    this.orderService.getAllOrder(page,this.pageSize).subscribe({
      next: (res) =>{
        this.allOrder = res;
        if (this.allOrder.length>0) {
          this.totalPage = this.allOrder[0].totalPage;
        }
        this.isLoading = false;
      },
      error: (err) =>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
