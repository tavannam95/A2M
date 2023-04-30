import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderApiService } from './order-api.service';
import { OrderDetailService } from '../order-detail/order-detail.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private readonly apiService: OrderApiService,
    private orderDetailService: OrderDetailService
  ) { }

  findExchange(page: any, size: any){
    return this.apiService.findExchange(page,size);
  }

  findAllExchange(){
    return this.apiService.findAllExchange();
  }

  getDataOrder(){
    return this.apiService.getDataOrder();
  }

  getAllOrder(page: any, size: any) {
    return this.apiService.getAllOrder(page,size);
  }

  getOrderGhn(){
    return this.apiService.getOrderGhn();
  }

  findByStatus(status: any, page: any, size: any){
    return this.apiService.findByStatus(status,page,size);
  }
  searchOrder(searchOrderDTO: any, page: any, size: any){
    return this.apiService.searchOrder(searchOrderDTO,page,size);
  }

  findAllByStatus(status: any){
    return this.apiService.findAllByStatus(status);
  }

  updateStatus(data: any, status: number){
    return this.apiService.updateStatus(data,status);
  }

  updateTotal(orderId: any){
    let orderDetailList = [];
    this.orderDetailService.getOrderDetailByOrderId(orderId).subscribe({
      next: (res) =>{
        orderDetailList = res;
      }
    })
  }

  setUpdateName(orderId: any, updateName: any){
    let order = null;
    this.apiService.findById(orderId).subscribe({
      next: res=>{
        order = res;
        order.udpateName = updateName;
        this.apiService.update(order).subscribe();
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }

  update(data:any){
    return this.apiService.update(data);
  }

  updateOrder(data: any){
    return this.apiService.updateOrder(data);
  }
  
  findById(id: any){
    return this.apiService.findById(id);
  }
}
