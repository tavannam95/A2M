import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
    providedIn: 'root'
})
export class UploadCloudinaryApiService {

    constructor(private readonly http: HttpClient) {
    }

    upload(files: any) {
        return this.http.post(`${ApiConstant.cloudinary}/upload`, files);
    }

    delete(publicId: any) {
        return this.http.delete(`${ApiConstant.cloudinary}/${publicId}`);
    }

}
