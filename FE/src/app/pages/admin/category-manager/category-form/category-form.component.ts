import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {CategoryService} from '../../../../shared/service/category/category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {


    isLoadingButton: boolean = false;
    title: string = '';
    images: any [] = [];
    lstCate:any;
    isUpdate:boolean = false;

    formGroup = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        image: [''],
        createDate: new Date(),
        status: [1]
    })


    constructor(private readonly fb: FormBuilder,
                private readonly matDialogRef: MatDialogRef<CategoryFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any,
                private categoryService: CategoryService,
                private toastService: ToastrService) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới danh mục';
        } else {
            this.isUpdate = true;
            this.title = 'Cập nhật danh mục';
            this.formGroup.patchValue(this.dataDialog.row);
        }
        this.getAllCategory();
    }

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid || this.formGroup.get('name').value.trim() == '') {
            this.toastService.error('Tên danh mục không được để trống');
            return;
        }
        if(this.lstCate?.length > 0 && !this.isUpdate){
            let check = false;
            this.lstCate.forEach(ca => {
                if(ca.name.toLowerCase() == this.formGroup.get('name').value.toLowerCase().trim()){
                    this.toastService.error('Tên danh mục đã tồn tại');
                    check = true;
                    return;
                }
            })
            if(check) return;
        }
        this.formGroup.get('name').setValue(this.formGroup.get('name').value.trim());
        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.categoryService.createCategory(this.formGroup.getRawValue());
        } else {
            this.categoryService.updateCategory(this.formGroup.getRawValue());
        }

        this.categoryService.isCloseDialog.subscribe(value => {
            if (value) {
                this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.categoryService.isCloseDialog.next(false);
            }
            this.isLoadingButton = false;
        })
    }

    onDismiss() {
        this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    onChangeImage(event: any) {
        this.images = event.addedFiles;
    }

    onRemove(f: any) {
        this.images.splice(this.images.indexOf(f), 1);
    }

    getAllCategory() {
        return this.categoryService.getAllCategory().subscribe({
            next: (res: any) => {
                this.lstCate = res;
            },
            error: (err) => {
                
            }
        })
    }
}
