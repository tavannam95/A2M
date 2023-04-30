import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../../../shared/service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailOrderComponent } from '../../../selling/selling/product-detail-order/product-detail-order.component';

@Component({
  selector: 'app-wrong-product-detail',
  templateUrl: './wrong-product-detail.component.html',
  styleUrls: ['./wrong-product-detail.component.scss']
})
export class WrongProductDetailComponent implements OnInit {
  productInput = new FormControl('');
  filteredProduct: Observable<any>;
  listProductSearch: any = [];


  constructor(
    private productService: ProductService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllProduct();
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
        }
      }
    )
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

}
