import {Component, OnInit} from '@angular/core';
import {Constant} from '../../../../shared/constants/Constant';
import {MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/service/employee/employee.service';
import {UploadCloudinaryService} from '../../../../shared/service/cloudinary/upload-cloudinary.service';

@Component({
    selector: 'employee-image',
    templateUrl: './employee-image.component.html',
    styleUrls: ['./employee-image.component.scss']
})
export class EmployeeImageComponent implements OnInit {
    title = 'Cập nhập hình ảnh'
    avatarFile: any[] = [];
    avatarUrl!: any;
    employee: any;
    avatarUrlEdit: any;

    constructor(private employeeService: EmployeeService,
                private readonly uploadService: UploadCloudinaryService,
                private dialogRef: MatDialogRef<EmployeeImageComponent>) {
        employeeService.getEmployeeById(3).subscribe( value =>{
            this.employee = value
        });
    }

    ngOnInit(): void {
    }

    onDismiss() {
        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    onChangeAvatar(event: any) {
        this.avatarFile = event.addedFiles;
    }

    saveImage(){
        this.uploadImage()
    }

    async uploadImage() {
        const formData = new FormData();
        formData.append('files', this.avatarFile[0]);
        try {
            this.avatarUrl = await this.uploadService.upload(formData).toPromise();
            this.employee.photo = this.avatarUrl[0]
            this.employeeService.updateEmployee(this.employee);

            this.employeeService.isCloseDialog.subscribe(
                value => {
                    if (value) {
                        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS)
                        this.employeeService.isCloseDialog.next(false);
                    }
                }
            )
        } catch (err) {
            console.log(err);
        }
    }

    onRemove(f: any) {
        this.avatarFile.splice(this.avatarFile.indexOf(f), 1);
    }

}
