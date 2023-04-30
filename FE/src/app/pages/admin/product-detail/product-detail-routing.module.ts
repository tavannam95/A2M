import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailFormComponent } from './product-detail-form/product-detail-form.component';

const routes: Routes = [
{
  path: '',
  component: ProductDetailFormComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailRoutingModule { }
