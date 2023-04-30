import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../../../../../shared/service/address/address.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Regex } from '../../../../../shared/validators/Regex';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GhnService } from '../../../../../shared/service/ghn/ghn.service';
import { Ghn } from '../../../../../shared/constants/Ghn';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss']
})
export class EditAddressDialogComponent implements OnInit {
  isLoading: boolean = false;

  provinces: any[];
  districts: any[];
  wards: any[];
  serviceId:any;
  shippingTotal: any;

  provinceName: any;
  districtName: any;
  wardName: any;
  formGroup = this.fb.group({
    provinceId: [-1],
    provinceName: [''],
    districtId: [-1],
    districtName: [''],
    wardId: [-1],
    wardName: [''],
    other: ['',[Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private addressService: AddressService,
    private toastService: ToastrService,
    private matDialogRef: MatDialogRef<EditAddressDialogComponent>,
    private ghnService: GhnService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProvince();
  }

  onSubmit(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.getRawValue().provinceId === -1 ||
        this.formGroup.getRawValue().districtId === -1 ||
        this.formGroup.getRawValue().wardId === -1
    ) {
      this.toastService.warning("Vui lòng chọn đầy đủ thông tin !")
      return;
    }
    this.formGroup.patchValue({
      wardName: this.wardName,
      districtName: this.districtName,
      provinceName: this.provinceName
    })
    let addressName = 
      this.formGroup.getRawValue().other + ', '
      + this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
    let data = {address: addressName, fee: this.shippingTotal}
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn đổi địa chỉ không?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.matDialogRef.close(data);
        }
      });
  }

  //Api tinh phí vận chuyển
  getShippingFee(districtId: any) {
    this.isLoading = true;
    const data = {
        "shop_id": 3424019,
        "from_district": 3440,
        "to_district": districtId
    }
    //Get service để lấy ra phương thức vận chuyển: đường bay, đường bộ,..
    this.ghnService.getService(data).subscribe((res: any) => {
      if (res.data && res.data.length > 1) {
        this.serviceId = res.data[1].service_id;
      }else{
        this.serviceId = res.data[0].service_id;
      }
        
        const shippingOrder = {
            "service_id": this.serviceId,
            "insurance_value": this.dataDialog.order.total,
            "from_district_id": 3440,
            "to_district_id": data.to_district,
            "weight": this.dataDialog.weight
        }
        //getShippingOrder tính phí vận chuyển
        this.ghnService.getShippingOrder(shippingOrder).subscribe((res: any) => {
            this.isLoading = false;
            this.shippingTotal = res.data.total;
            
        })
    })
}

  getProvince() {
    this.addressService.getProvince().subscribe((res: any) => {
      this.provinces = res.data;
    })
  }
  getDistrict(provinceId: any, provinceName: any) {
    this.addressService.getDistrict(provinceId).subscribe((res: any) => {
      this.districts = res.data;
    })
    this.provinceName = provinceName;
  }

  getWard(districtId: any, districtName: any) {
    this.getShippingFee(districtId);
    this.addressService.getWard(districtId).subscribe((res: any) => {
      this.wards = res.data;
    })
    this.districtName = districtName;
  }

  resetDistrictAndWard() {
    this.formGroup.patchValue({districtId: -1});
    this.formGroup.patchValue({wardId: -1});
    this.districts = [];
    this.wards = [];
  }

  resetWard() {
    this.formGroup.patchValue({wardId: -1});
    this.wards = [];
  }

  getWardName(wardName: any) {
    this.wardName = wardName;
  }

}
