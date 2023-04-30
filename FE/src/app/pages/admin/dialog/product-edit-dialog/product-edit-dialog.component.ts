import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/service/product/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/service/category/category.service';
import { CategoryCreateDialogComponent } from '../category-create-dialog/category-create-dialog.component';
import { Regex } from '../../../../shared/validators/Regex';
import { UploadCloudinaryService } from '../../../../shared/service/cloudinary/upload-cloudinary.service';
import { ToastrService } from 'ngx-toastr';
import { TrimService } from '../../../../shared/service/trim/trim.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../shared/constants/Constant';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent implements OnInit {

  thumnailFile: any[] = [];
  thumnailUrl!: any;

  categories: any;

  product: any;
  productFG = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    price: ['',[Validators.min(10000),Validators.required]],
    weight: ['',[Validators.min(1),Validators.required]],
    status: [''],
    thumnail: [''],
    updateDate: [''],
    createDate: [''],
    description: [''],
    category: this.fb.group({
      id: ['',Validators.required]
    }),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uploadService: UploadCloudinaryService,
    private toastrService: ToastrService,
    private trimService: TrimService,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<ProductEditDialogComponent>
  ) { }

  ngOnInit() {
    this.getProductById();
    this.getAllCategory();
  }
  updateP(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn cập nhật thông tin sản phẩm?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
            this.updateProduct();
        }
    })
  }

  getProductById(){
    this.productService.getOneProduct(this.dataDialog.id).subscribe(res=>{
      this.productFG.patchValue(res);
    })
  }

  async uploadThumnail() {
    const formData = new FormData();
    formData.append('files', this.thumnailFile[0]);
    try {
      this.thumnailUrl = await this.uploadService.upload(formData).toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(){
    this.trimService.inputTrim(this.productFG, ["name", "description"]);
    this.productFG.markAllAsTouched();
    console.log(this.productFG.value);
    
    if (this.thumnailFile.length > 0) {
      await this.uploadThumnail();
      this.productFG.patchValue({thumnail: this.thumnailUrl[0]});
    }
    if (this.productFG.valid) {
      this.productService.updateProduct(this.productFG.value, this.productFG.value.id).subscribe({
        next: (res) =>{
          this.toastrService.success('Cập nhật thành công');
          this.matDialogRef.close('submit');
        },
        error: (err)=>{
          this.toastrService.error('Lỗi cập nhật');
        }
      });
    }
  }

  cancel(){
    this.matDialogRef.close('cancel');
  }

  getAllCategory(){
    return this.categoryService.findAllByStatus().subscribe({
      next: (res) => {
          //Gán data vào biến
          this.categories = res;
        },
      error: (err) => {
        console.log(err);
        
      }
  })
  }

  openDialogCreateCategory(){
    let dialogRef = this.dialog.open(CategoryCreateDialogComponent,{
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllCategory();
    })
  }

  check(){
    
    
  }

  onSelect(event) {
    if(this.thumnailFile){
      this.thumnailFile.splice(0,1);
    }
		this.thumnailFile.push(...event.addedFiles);
	}
  // End image thumnail product

  //Remove image
	onRemove(f: any) {
      this.thumnailFile.splice(this.thumnailFile.indexOf(f), 1);
      this.thumnailUrl = '';
	}
}
