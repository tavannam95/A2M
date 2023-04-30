import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {PromotionComponent} from '../promotion.component';
import {CategoryService} from '../../../../shared/service/category/category.service';
import {ProductService} from '../../../../shared/service/product/product.service';
import {PromotionService} from '../../../../shared/service/promotion/promotion.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'promotion-product',
  templateUrl: './promotion-product.component.html',
  styleUrls: ['./promotion-product.component.scss']
})
export class PromotionProductComponent implements OnInit  {

  displayedColumns: string[] = ['select' , 'name', 'price', 'action'];
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  type =1 ;
  listCate: any[] = []
  listPro: any[] = [];
  listProDis: any[] = [] ;
  listProsChoosed: any[] = [] ;
  listAdd: any[] = [] ;
  data2:any;

  form = this.fb.group({
     category: null ,
     htgg: 1 ,
     startPrice: null ,
     endPrice: null
  })

  constructor( private fb: FormBuilder ,
               public dialogRef: MatDialogRef<PromotionComponent>,
               private categoryService: CategoryService ,
               private productService: ProductService ,
               private promotion: PromotionService ,
               private toast: ToastrService ,
               @Inject(MAT_DIALOG_DATA) public data: any ) {
  }

  getAllCategory(){
     this.categoryService.getAllCategory().subscribe( (value:any) => {
         this.listCate = value ;
     })
  }

  getProByCate(){
     this.productService.getProByCate(this.form.getRawValue() ).subscribe( (value:any) => {
         this.dataSource = new MatTableDataSource<any>(value);
         this.dataSource.paginator = this.paginator;
         this.data2 = value;
         this.isAllSelected()
     })
  }

  getProDis(){
      this.promotion.getAllProductDiscount( this.data.idDis ).subscribe(( value: any) => {
          this.listProDis = value ;
          for (let data3 of this.data2){
            for ( let x of value ){
              // this.listProsChoosed.push(x.product);
                  if(data3.id == x.product.id){
                      this.selection.select(data3);
                  }
              }

          }
      })
  }

  onSearch(){
      if( this.form.getRawValue().category == 0 ){
          this.form.patchValue({
              category: null
          })
      }
      if( this.type == 1 ){
          this.form.patchValue({
              startPrice: null ,
              endPrice: null
          })
      }

      this.getProByCate();
      if( this.form.getRawValue().category == null ){
          this.form.patchValue({
              category: 0
          })
      }
  }

  applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  ngOnInit(): void {
     this.getAllCategory();
     this.onSearch();
     this.getProDis() ;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'}`;
    }

    if( this.selection.isSelected(row) ){
        if( this.checkSimilar( row.id) ){
            this.listPro.push(row)
        }
    }else{
        if( this.checkSimilar(row.id) == false ){
            this.listPro.splice(this.listPro.indexOf(row)   ,1)
        }
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  checkSimilar( data: any ){
      for( let x of this.listPro ){
          if( x.id == data ){
              return false ;
          }
      }
      return true ;
  }

  changeHTGG(data:any){
     this.type = data ;
  }

  onClose(){
     this.dialogRef.close() ;
  }

  onClear(){
      this.form.reset() ;
  }

  onSave(){
      this.promotion.addProductIntoPromotion( this.listPro , this.data.idDis ).subscribe({
          next: () =>{
              this.toast.success("Thêm sản phẩm thành công")
              this.dialogRef.close()
          },
          error: err => {
              this.toast.error("Thêm sản phẩm thất bại")
          }
      }) ;
  }
}
