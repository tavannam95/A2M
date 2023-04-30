import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailOrderComponent } from './product-detail-order.component';

describe('ProductDetailOrderComponent', () => {
  let component: ProductDetailOrderComponent;
  let fixture: ComponentFixture<ProductDetailOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
