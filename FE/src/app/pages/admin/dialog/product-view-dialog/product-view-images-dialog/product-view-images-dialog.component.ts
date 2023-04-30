import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ProductImageService } from "../../../../../shared/service/productImage/product-image.service";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "../../../../../shared/confirm-dialog/confirm-dialog.component";
import { Constant } from "../../../../../shared/constants/Constant";
import { ProductImageCreateDialogComponent } from '../product-image-create-dialog/product-image-create-dialog.component';
import {StorageService} from '../../../../../shared/service/storage.service';

@Component({
  selector: "app-product-view-images-dialog",
  templateUrl: "./product-view-images-dialog.component.html",
  styleUrls: ["./product-view-images-dialog.component.scss"],
})
export class ProductViewImagesDialogComponent implements OnInit {
  productImages: any;
  displayedColumns: string[] = ["id", "image", "function"];
  dataSource: MatTableDataSource<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private productImageService: ProductImageService,
    private readonly toastrService: ToastrService,
    private matDialog: MatDialog,
    private readonly storageService: StorageService
  ) {}

  ngOnInit() {
    this.getProductDetailById(this.dataDialog.id);
  }

  deleteProductImage(data: any, id: number) {
    if(this.storageService.getRoleFromToken() != 'ROLE_SUPER_ADMIN'){
      this.toastrService.warning("Bạn không có quyền truy câp chức năng này !")
      return;
    }
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn xóa ảnh không?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.productImageService.deleteProductImage(data, id).subscribe({
            next: (res) => {
              this.getProductDetailById(this.dataDialog.id);
              this.toastrService.success("Xóa ảnh thành công");
            },
            error: (err) => {
              this.toastrService.error("Lỗi xóa ảnh");
            },
          });
        }
      });
  }

  getProductDetailById(id: any) {
    this.productImages = [];
    this.productImageService.getProductImageById(id).subscribe({
      next: (res) => {
        this.productImages = res;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        if (this.productImages.length == 0) {
          this.toastrService.warning("Sản phẩm không có ảnh");
        }
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error("Lỗi tải hình ảnh");
      },
    });
  }
  openDialogCreateProductImage(){
    if(this.storageService.getRoleFromToken() != 'ROLE_SUPER_ADMIN'){
      this.toastrService.warning("Bạn không có quyền truy câp chức năng này !")
      return;
    }
    let dialogRef = this.matDialog.open(ProductImageCreateDialogComponent,{
      width: '950px',
      disableClose: true,
      data: this.dataDialog.id
    });

    dialogRef.afterClosed().subscribe(res=>{
      this.getProductDetailById(this.dataDialog.id);
    })
  }
}
