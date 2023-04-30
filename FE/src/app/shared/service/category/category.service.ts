import {Injectable} from '@angular/core';
import {CategoryApiService} from './category-api.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    constructor(
        private readonly categoryApiService: CategoryApiService,
        private toastService: ToastrService
    ) {
    }

    getAllCategory() {
        return this.categoryApiService.getAllCategory();
    }

    createCategory(data: any) {
        return this.categoryApiService.createCategory(data).subscribe({
            next: (res) => {
                this.toastService.success('Tạo mới danh mục thành công !');
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                this.toastService.error('Tạo mới danh mục thất bại !');
                this.isCloseDialog.next(false);
            }
        })
    }

    updateCategory(data: any) {
        return this.categoryApiService.updateCategory(data).subscribe({
            next: (res) => {
                this.toastService.success('Cập nhật danh mục thành công !');
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                this.toastService.error('Cập nhật danh mục thất bại !');
                this.isCloseDialog.next(false);
            }
        })
    }

    findAllByStatus() {
        return this.categoryApiService.findAllByStatus();
    }
}
