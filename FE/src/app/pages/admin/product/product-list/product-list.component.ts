import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../../../shared/service/product/product.service';
import { ProductEditDialogComponent } from '../../dialog/product-edit-dialog/product-edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ProductViewDialogComponent } from '../../dialog/product-view-dialog/product-view-dialog.component';
import { filter } from 'rxjs';
import { ProductViewImagesDialogComponent } from '../../dialog/product-view-dialog/product-view-images-dialog/product-view-images-dialog.component';
import {StorageService} from '../../../../shared/service/storage.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit  {
  
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'thumnail', 'weight', 'status', 'function'];
  dataSource: MatTableDataSource<any>;


  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private dialog: MatDialog,
              private toastrService: ToastrService,
              private  readonly storageService: StorageService,
               public _MatPaginatorIntl: MatPaginatorIntl
              ) {   }
              
  ngOnInit(): void {
    this.getAllProduct();
    // this._MatPaginatorIntl.itemsPerPageLabel = 'Số sản phẩm';
  }

  openProductViewImagesDialog(data: any){
    this.dialog.open(ProductViewImagesDialogComponent,{
      width: '1000px',
      data: data,
      disableClose: true
    })
  }

  getAllProduct(){
    this.isLoading = true;
    return this.productService.getAllProduct().subscribe({
      next: (res) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error: (err) => {
          this.isLoading = false;
          console.log(err)
      }
  })
  }


  checkData(){

  }


  openDialogProductEdit(data: any){
    if(this.storageService.getRoleFromToken() != 'ROLE_SUPER_ADMIN'){
        this.toastrService.warning("Bạn không có quyền truy câp chức năng này !")
      return;
    }
    let dialogRef = this.dialog.open(ProductEditDialogComponent,{
      data: data,
      width: '1000px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( value => {
      if (value=='submit') {
        this.getAllProduct();
      }
    })
  }

  openDialogProductView(data: any){
    this.dialog.open(ProductViewDialogComponent,{
      data: data,
      width: '1400px',
      height: '702px',
      disableClose: true
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}

