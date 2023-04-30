import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmSellingComponent } from './comfirm-selling.component';

describe('ComfirmSellingComponent', () => {
  let component: ComfirmSellingComponent;
  let fixture: ComponentFixture<ComfirmSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmSellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
