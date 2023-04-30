import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private readonly http: HttpClient) {
  }

  getProvince() {
    return this.http.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province');
  }

  getDistrict(provinceId: any) {
    return this.http.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`);
  }

  getWard(districtId: any) {
    return this.http.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`);
  }

  getService(data: any) {
    return this.http.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', data);
  }

  getShippingOrder(data: any) {
    return this.http.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', data);
  }
}
