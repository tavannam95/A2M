import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailService } from '../../../../../shared/service/order-detail/order-detail.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';
import { FormControl } from '@angular/forms';
import { startWith, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../../../shared/service/product/product.service';
import { ProductDetailOrderComponent } from '../../../selling/selling/product-detail-order/product-detail-order.component';
import { StorageService } from '../../../../../shared/service/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { quantity } from 'chartist';
import { GhnService } from '../../../../../shared/service/ghn/ghn.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  productInput = new FormControl('');
  filteredProduct: Observable<any>;
  listProductSearch: any = [];

  isLoading: boolean = false;
  orderDetailsList: any[] = [];
  order: any;
  quantityList = [];
  quantityPresentList = [];
  productDetail: any;
  orderDetail = {
    order: {id: null},
    productsDetail: {
      id: null, 
      product:{name:'', thumnail:''}, 
      color:{code:'',id: null}, 
      size:{code:'',id: null}
    },
    unitprice: null,
    quantity: null,
    status: 1
  }

  shippingTotal: any;
  serviceId: any;

  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity', 'function'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private matDialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private orderService: OrderService,
    private productDetailService: ProductDetailService,
    private toastrService: ToastrService,
    private orderDetailService: OrderDetailService,
    private matDialog: MatDialog,
    private productService: ProductService,
    private storageService: StorageService,
    private ghnService: GhnService,
  ) { }

  ngOnInit() {
    this.getOrderAndOrderDetails();
    this.getAllProduct();
    // console.log(this.dataDialog);
    
  }

  closeDialog(check: any){
    this.matDialogRef.close(check);
  }
  check(i: any){
    this.orderService.updateTotal(this.order.id);
    
  }
  getOrderAndOrderDetails(){
    this.orderService.findById(this.dataDialog.orders.id).subscribe({
      next: res=>{
        this.order = res;
      },
      error: e=>{
        console.log(e);
        
      }
    });
    this.orderDetailService.getOrderDetailByOrderId(this.dataDialog.orders.id).subscribe({
      next: res =>{
        this.orderDetailsList = res;
        this.dataSource = res;
        this.pushQuantity(); 
      }
    })
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe({
        next: resp => {
            this.listProductSearch = resp;
            this.productFilter();
        },
        error: error => {
          console.log(error);
        }
    })
  }

  productFilter() {
    this.filteredProduct = this.productInput.valueChanges.pipe(
        startWith(''),
        map(value => this._filterproduct(value || '')),
    );
  }
  _filterproduct(value: any): any[] {
    var filterValue;
    if (isNaN(value)) {
        filterValue = value.toLowerCase();
    } else {
        filterValue = value;
    }
    return this.listProductSearch.filter(option => option.name?.toLowerCase().includes(filterValue)
        || option.name?.includes(filterValue));
  }
  
  openDialog(product: any) {
    this.productInput.setValue('');
    this.matDialog.open(ProductDetailOrderComponent, {
        width: '40vw',
        disableClose: true,
        hasBackdrop: true,
        data: {
            product: product
        }
    }).afterClosed().subscribe(value => {
        if (!(value == null || value == undefined)) {
          if (this.checkorderDetailsList(value.id)) {
            this.orderDetail = {
              order: {id: null},
              productsDetail: {
                id: null, 
                product:{name:'', thumnail:''}, 
                color:{code:'',id: null}, 
                size:{code:'',id: null}
              },
              unitprice: null,
              quantity: null,
              status: 1
            };
            this.orderDetail.order.id = this.order.id;
            this.orderDetail.productsDetail.product.name = value.product.name;
            this.orderDetail.productsDetail.product.thumnail = value.product.thumnail;
            this.orderDetail.unitprice = value.price;
            this.orderDetail.quantity = value.quantityOrder;
            this.orderDetail.productsDetail.color.code = value.nameColor;
            this.orderDetail.productsDetail.color.id = value.colorId;
            this.orderDetail.productsDetail.size.code = value.nameSize;
            this.orderDetail.productsDetail.size.id = value.sizeId;
            this.orderDetail.productsDetail.id = value.id;
            
            this.orderDetailsList.push(this.orderDetail);
            
            this.quantityPresentList.push(0);
            this.dataSource = new MatTableDataSource<any>(this.orderDetailsList);
          }else{
            this.toastrService.warning('Sản phẩm đã có trong đơn');
            //Cộng thêm số lượng
            // for (let i = 0; i < this.orderDetailsList.length; i++) {
            //   if (this.orderDetailsList[i].productsDetail.id == value.id) {
            //     this.orderDetailsList[i].quantity += value.quantityOrder;
            //   }
            // }
          }
        }
      }
    )
  }
  
  checkorderDetailsList(id: any){
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      if (this.orderDetailsList[i].productsDetail.id == id) {
        return false;
      }
    }
    return true;
  }
  removeOrderDetail(index: any){
    if (this.orderDetailsList.length==1) {
      this.toastrService.warning('Không được xóa hết sản phẩm trong đơn')
      return;
    }
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn xóa sản phẩm khỏi đơn hàng?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.quantityList.splice(index,1);
          this.quantityPresentList.splice(index,1);
          this.orderDetailsList.splice(index,1);
          this.dataSource = new MatTableDataSource<any>(this.orderDetailsList);
        }
      });
  }
  subtractQuantity(idPD: any, quantity: any){
    this.productDetailService.getOneProductDetail(idPD).subscribe({
      next: (res) =>{
        this.productDetail = res;
        this.productDetail.quantity -= quantity;
        this.productDetailService.updateProductDetail(this.productDetail).subscribe({
          next: (r)=>{

          },
          error: (e) =>{
            console.log(e);
            
          }
        })
      }
    })
  }
  pushQuantity(){
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.quantityList.push(this.orderDetailsList[i].quantity);
      this.quantityPresentList.push(this.orderDetailsList[i].quantity);
    }
  }
  readQuantity(){
    this.quantityList = [];
    this.quantityPresentList = [];
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.quantityList.push(this.orderDetailsList[i].quantity);
      this.quantityPresentList.push(this.orderDetailsList[i].quantity);
    }
  }
  setQuantity(event: any, index: any, row: any){
    let newQty = event.target.value;
    let oldQty = this.quantityPresentList[index];
    let presentQty = null;
    if (event.target.value=='') {
      // event.target.value = oldQty;
      this.toastrService.error('Số lượng không được để trống')
      return;
    }
    if (event.target.value<=0) {
      event.target.value = oldQty;
      this.quantityList[index] = parseInt(event.target.value);
      this.toastrService.warning('Số lượng phải lớn hơn 0')
      return;
    }
    this.productDetailService.getOneProductDetail(row.productsDetail.id).subscribe(res=>{
      presentQty = res.quantity;
      if (newQty==oldQty) {
        return;
      }else if ((newQty>oldQty)&&presentQty<=0) {
        event.target.value = oldQty;
        this.quantityList[index] = parseInt(event.target.value);
        this.toastrService.warning('Số lượng sản phẩm đã hết');
        return;
      }else if ((newQty-oldQty)>presentQty) {
        event.target.value = presentQty + oldQty;
        this.quantityList[index] = parseInt(event.target.value);
        this.toastrService.warning('Số lượng còn trong kho: ' + presentQty);
        return;
      }else if (newQty!=oldQty&&(newQty-oldQty)<presentQty) {
        this.quantityList[index] = parseInt(event.target.value);
      }
    })
  }

  //Api tinh phí vận chuyển
  getShippingFee(districtId: any) {
    this.isLoading = true;
    const data = {
        "shop_id": 3424019,
        "from_district": 3440,
        "to_district": districtId
    }
    //Get service để lấy ra phương thức vận chuyển: đường bay, đường bộ,..
    this.ghnService.getService(data).subscribe((res: any) => {
      if (res.data && res.data.length > 1) {
        this.serviceId = res.data[1].service_id;
      }else{
        this.serviceId = res.data[0].service_id;
      }
        
        const shippingOrder = {
            "service_id": this.serviceId,
            "insurance_value": this.dataDialog.order.total,
            "from_district_id": 3440,
            "to_district_id": data.to_district,
            "weight": this.dataDialog.weight
        }
        //getShippingOrder tính phí vận chuyển
        this.ghnService.getShippingOrder(shippingOrder).subscribe((res: any) => {
            this.isLoading = false;
            this.shippingTotal = res.data.total;
            
        })
    })
}

  onSubmit(){

    console.log(this.shippingTotal);
    
    for (let i = 0; i < this.quantityList.length; i++) {
      this.orderDetailsList[i].quantity = this.quantityList[i];
    }
      this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn cập nhật đơn hàng?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.setUpdateName();
          this.orderService.update({id: this.order.id,listOrderDetail:this.orderDetailsList}).subscribe({
            next: res=>{
              this.closeDialog('submit');
              this.toastrService.success('Cập nhật thành công')
              
            },
            error: e=>{
              console.log(e);
              this.toastrService.error('Cập nhật thất bại')
            }
          })
        }
      });
  }
  setUpdateName(){
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.orderDetailsList[i].updateName = this.storageService.getFullNameFromToken();
    }
  }
}
