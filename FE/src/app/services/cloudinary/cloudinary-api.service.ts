import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';



@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  constructor(private readonly http: HttpClient) { }

  upload(files: any) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' })
    return this.http.post(`${ApiConstant.cloudinary}/upload`, files, { headers: headers });
  }

  delete(publicId: any) {
    return this.http.delete(`${ApiConstant.cloudinary}/${publicId}`);
  }

}
