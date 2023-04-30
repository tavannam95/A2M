import { Injectable } from '@angular/core';
import { CloudinaryApiService } from './cloudinary-api.service';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

constructor(private readonly uploadService: CloudinaryApiService) { }

  upload(files: any) {
    return this.uploadService.upload(files);
  }

  delete(publicId: any) {
    return this.uploadService.delete(publicId);
  }

}
