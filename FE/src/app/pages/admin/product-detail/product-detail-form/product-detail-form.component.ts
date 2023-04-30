import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SizeService } from '../../../../shared/service/size/size.service';
import { ColorService } from '../../../../shared/service/color/color.service';
import { ProductDetailService } from '../../../../shared/service/productDetail/product-detail.service';
import { Regex } from '../../../../shared/validators/Regex';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ColorCreateDialogComponent } from '../../dialog/color-create-dialog/color-create-dialog.component';
import { ProductService } from '../../../../shared/service/product/product.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../shared/constants/Constant';
import { ImportExcelDialogComponent } from '../dialog/import-excel-dialog/import-excel-dialog.component';
import { TrimService } from '../../../../shared/service/trim/trim.service';

export class Employee{
  product:{id:''};
  color: {id:''};
  size: {id:''};
  quantity:number;
}

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.scss']
})
export class ProductDetailFormComponent implements OnInit {
  willDownload = false;
  fileName: string = "";
  allSize: any;
  quantity: any = [];
  isLoading: boolean = false;
  files: File[] = [];
  selectedColor: any;
  checkColor: boolean;
  checkSize: boolean;
  productId: any;
  colorId: any = {
    id: '',
    code:''
  };
  allColor: any;
  colorFormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required,Validators.pattern(Regex.unicode)]],
    code: ['', Validators.required],
    status: null
  })
  // Size Color API create
  productDetailFormGroup = this.fb.group({
    product: this.fb.group({
      id: ['']
    }),
    color: this.fb.group({
      id: ['']
    }),
    size: this.fb.group({
      id: ['']
    }),
    quantity: ['']
  })
  productDetailDto: any = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly productDetailService: ProductDetailService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private readonly productService: ProductService,
    private trimService: TrimService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getAllColor();
    this.getAllSize();
  }
  onChange(event) {
    this.fileName = event.target.files[0].name;
  }

  checkRouter(){
    this.router.navigate(["/product"]);
  }
  
  //XLSX------------------------
  openImportExcel(productId: any){
    this.dialog.open(ImportExcelDialogComponent,{
      data: productId,
      disableClose: true,
      width: '500px'
    })
  }
  
  

  getAllSize(){
    this.sizeService.getAllSize().subscribe({
      next: (res) =>{
        this.allSize = res;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  createProductDetail(){
    this.checkColor = false;
    this.checkSize = false;
    this.productDetailDto = [];
    for (let i = 0; i < this.allSize.length; i++) {
      if (this.quantity[i] <=0) {
        this.toastrService.warning('Số lượng phải lớn hơn 0');
        return;
      }
    }
    for (let i = 0; i < this.allSize.length; i++) {
      if (this.quantity[i] == undefined ||this.quantity[i] == null) {
        continue;
      }
      this.productDetailDto.push({
        product: {id: this.productId},
        color: {id: this.colorId.id},
        size: this.allSize[i],
        quantity: this.quantity[i]
      })
    }

    if (this.colorId.id == "") {
      this.checkColor = true;
      this.toastrService.error('Vui lòng nhập đủ thông tin');
      return;
    }

    let check = 0;
    for (let i = 0; i < this.productDetailDto.length; i++) {
      if (this.productDetailDto[i].quantity == null) {
        check++;
      }
    }
    if (check == this.productDetailDto.length) {
      this.checkSize = true;
      this.toastrService.error('Vui lòng nhập đủ thông tin');
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
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
              this.router.navigate(["/product"]);
            },
            error: (err)=>{
              this.toastrService.error('Lỗi nhập hàng');
            }
          })
        }
    })
    
    
    
  }

  selectColor(code: any){
    this.selectedColor = code;
  }
  getAllColor(){
    this.isLoading = true;
    this.colorService.getAllColor().subscribe({
      next: (res)=>{
        this.isLoading = false;
        this.allColor = res;
      },
      error: (err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  openDialogCreateColor(){
    let dialogRef = this.dialog.open(ColorCreateDialogComponent,{
      width: '1000px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res=>{
      if (res=='submit') {
        this.getAllColor();
      }
    })
  }
  

}
