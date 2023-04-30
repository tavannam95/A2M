import { Injectable } from '@angular/core';
import { OrderDetailApiService } from './order-detail-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private orderDetailService: OrderDetailApiService) { }

  getOrderDetailByOrderId(orderId: any){
    return this.orderDetailService.getOrderDetailByOrderId(orderId);
  }
  updateOrderDetail(orderDetail: any){
    return this.orderDetailService.updateOrderDetail(orderDetail);
  }
  findById(id: any){
    return this.orderDetailService.findById(id);
  }
  delete(id: any){
    return this.orderDetailService.delete(id);
  }
}
