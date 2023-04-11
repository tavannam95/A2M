import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

constructor(private readonly http: HttpClient) { }

upload(files: any) {
  return this.http.post(`${ApiConstant.cloudinary}/upload`, files);
}

delete(publicId: any) {
  return this.http.delete(`${ApiConstant.cloudinary}/${publicId}`);
}

}
