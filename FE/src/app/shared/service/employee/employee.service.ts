import {enableProdMode, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmployeeApiService} from './employee-api.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private toast: ToastrService,
                private emApi: EmployeeApiService) {
    }

    getAllEmployee() {
        return this.emApi.getAll()
    }

    getEmployeeById( id: number ){
        return this.emApi.getById( id) ;
    }

    createEmployee(employee: any) {
        employee.fullname = employee.fullname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        employee.address = employee.address.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        employee.password = employee.password.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

        this.emApi.create(employee).subscribe({
            next: value => {
                if (value.id) {
                    this.toast.success('Thêm mới thành công')
                    this.isCloseDialog.next(true)
                }
            },
            error: err => {
                if (err.error.code == 'UNIQUE_FIELD') {
                    this.toast.error( err.error.message );
                }
                this.toast.error('Thêm mới thất bại')
                this.isCloseDialog.next(false)
            }
        })
    }

    updateEmployee(employee: any) {
        employee.fullname = employee.fullname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        employee.address = employee.address.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        employee.password = employee.password.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

        this.emApi.update(employee).subscribe({
            next: value => {
                this.toast.success('Cập nhập thành công')
                this.isCloseDialog.next(true)
            },
            error: err => {
                this.toast.error('Cập nhập thất bại')
                this.isCloseDialog.next(false)
            }
        })
    }

    updateEmployeeStatus( employee: any ) {
        this.emApi.updateStatus(employee).subscribe({
            next: value => {
                this.toast.success('Cập nhập thành công')
                this.isCloseDialog.next(true)
            },
            error: err => {
                this.toast.error('Cập nhập thất bại')
                this.isCloseDialog.next(false)
            }
        })
    }

    changPassword(id: number , oldPassword: any , newPassword: any){
        return this.emApi.changPassword( id , oldPassword , newPassword ) ;
    }
}
