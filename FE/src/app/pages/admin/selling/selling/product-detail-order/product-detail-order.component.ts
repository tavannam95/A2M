import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SellingComponent} from "../selling.component";
import {SellingService} from "../../../../../shared/service/selling/selling.service";
import {logging} from "protractor";
import {quantity} from "chartist";
import {Constant} from "../../../../../shared/constants/Constant";
import {FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'product-detail-order',
    templateUrl: './product-detail-order.component.html',
    styleUrls: ['./product-detail-order.component.scss']
})
export class ProductDetailOrderComponent implements OnInit {

    constructor(private matDialogRef: MatDialogRef<SellingComponent>,
                private sellingService: SellingService,
                private toast: ToastrService,
                @Inject(MAT_DIALOG_DATA) public dataDialog?: any,
    ) {
    }


    product: any;
    listSizeOfProduct: any;
    listColorOfProduct: any;
    color: any = [];
    size: any = [];
    // SỐ lượng trong kho
    quantityInventory: number = 0;
    // Số lượng order
    quantityinput: any = 1;
    // Số lượng order trước khi thay đổi
    quantityOld: any;
    productDetailOrder: any;
    //Index tabs


    message = '';

    ngOnInit(): void {
        this.listSizeOfProduct = [];
        this.listColorOfProduct = [];
        let colorOfProduct = new Map();
        let sizeOfProduct = new Map();
        this.product = this.dataDialog.product;
        if (this.product.size === undefined || this.product.color === undefined) {
            this.sellingService.getProductDetail(this.product.id).subscribe(
                resp => {
                    this.product.productDetail = resp;
                    this.product.productDetail.forEach(
                        detail => {
                            colorOfProduct.set(detail.colorId, detail.nameColor);
                            sizeOfProduct.set(detail.sizeId, detail.nameSize);
                        }
                    )
                    colorOfProduct.forEach((value, key) => {
                        this.listColorOfProduct.push({id: key, code: value})
                    });
                    sizeOfProduct.forEach((value, key) => {
                        this.listSizeOfProduct.push({id: key, code: value})
                    });
                }
            )
        }
    }

    clickSizeOrColor(key: any, id: any) {
        if (key === 'color') {
            if(this.color.length  == 0 && this.listSizeOfProduct.click != undefined){
                return;
            }
            if (this.listColorOfProduct.click === undefined || this.listColorOfProduct.click != id) {
                this.size = this.product.productDetail.filter(pd => pd.colorId === id && pd.quantity > 0).map(pd => {
                    return pd.sizeId
                });
                this.listColorOfProduct.click = id;
            } else {
                this.listColorOfProduct.click = undefined;
                this.size = [];
                this.quantityInventory = 0;
            }
        } else {
            if(this.size.length  == 0 && this.listColorOfProduct.click != undefined){
                return;
            }

            if (this.listSizeOfProduct.click === undefined || this.listSizeOfProduct.click != id) {
                this.color = this.product.productDetail.filter(pd => pd.sizeId === id && pd.quantity > 0).map(pd => {
                    return pd.colorId
                });
                this.listSizeOfProduct.click = id;
            } else {
                this.listSizeOfProduct.click = undefined;
                this.quantityInventory = 0;
                this.color = [];
            }
        }
        if (this.listSizeOfProduct.click != undefined && this.listColorOfProduct.click != undefined) {
            let colorId = this.listColorOfProduct.click;
            let sizeId = this.listSizeOfProduct.click;
            this.productDetailOrder = this.product.productDetail.filter(pd => pd.sizeId === sizeId && pd.colorId === colorId);
            this.quantityInventory = this.productDetailOrder[0].quantity;
            this.quantityinput = 1;

        }
    }

    onDismiss() {
        this.matDialogRef.close();
    }

    onSubmit() {

            if (this.listColorOfProduct.click !== undefined && this.listSizeOfProduct.click !== undefined) {
                if (this.quantityinput > 0 && this.quantityinput <= this.quantityInventory) {
                    this.productDetailOrder[0].product = this.product;
                    this.productDetailOrder[0].quantityOrder = parseInt(this.quantityinput);
                    this.productDetailOrder[0].price = this.product.price;
                    this.productDetailOrder[0].quantityInventory = this.quantityInventory;
                    this.productDetailOrder[0].productName = this.product.name;
                    this.productDetailOrder[0].weight = this.product.weight;
                    this.matDialogRef.close(this.productDetailOrder[0]);
                }else{

                        this.message = 'Số lượng không hợp lệ';
                    }
                // Do filter trả về 1 mảng nên phải [0]

            }else{
                this.toast.error('Vui lòng chọn đủ size và màu sắc!!');
            }
        }


    checkQuantityInput() {
        this.message = '';
        // let pattern = /^[0-9]*$/
        // if (this.quantityinput == ''){
        //     this.quantityinput = 1;
        // }
        // if (pattern.test(this.quantityinput)) {
        //     this.quantityinput = parseInt(this.quantityinput);
        //     if (this.quantityinput > this.quantityInventory) {
        //         this.quantityinput = this.quantityInventory
        //     }
        //     this.quantityOld = this.quantityinput
        // } else {
        //     this.quantityinput = this.quantityOld;
        // }
    }

    plusQuantity() {
        if (this.quantityinput < this.quantityInventory) {
            this.quantityinput += 1;
        }
    }

    minusQuantity() {
        if (this.quantityinput > 1) {
            this.quantityinput -= 1;
        }
    }

}
