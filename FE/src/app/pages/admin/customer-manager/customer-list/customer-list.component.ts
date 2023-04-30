import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {CustomerFormComponent} from '../customer-form/customer-form.component';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {CustomerService} from '../../../../shared/service/customer/customer.service';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

    displayedColumns: string[] = ['select', 'fullname', 'photo', 'email', 'phone', 'birthDate', 'siginDate', 'status', 'action'];
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<any>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    TYPE_DIALOG = Constant.TYPE_DIALOG;
    customers: any[] = [];
    isLoading: boolean = false;

    constructor(private readonly matDialog: MatDialog,
                private readonly customerService: CustomerService,
                private readonly http: HttpClient,
                private readonly toastService: ToastrService,) {
    }

    ngOnInit(): void {
        this.getAllCustomer();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource?.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    getAllCustomer() {
        this.isLoading = true;
        return this.customerService.getAllCustomer().subscribe({
            next: (res) => {
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<any>(res);
                this.dataSource.data = res;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
                this.toastService.error('Lỗi tải dữ liệu !!!');
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(CustomerFormComponent, {
            width: '1000px',
            disableClose: true,
            hasBackdrop: true,
            autoFocus: false ,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllCustomer();
            }
        })
    }

    onDelete(row: any) {
        this.matDialog.open(ConfirmDialogComponent, {
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn thay đổi trạng thái người dùng?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
                row.status = 0;
                this.customerService.deleteCustomer(row, row.id);
            }
        })
    }

    deleteAll(status: number) {
        let arrId = [];
        this.matDialog.open(ConfirmDialogComponent, {
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn thay đổi trạng thái người dùng?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
                if (this.selection.selected.length > 0) {
                    this.selection.selected.forEach(select => {
                        arrId.push(select.id);
                    })

                    if (status === 1) {
                        this.customerService.updateAllStatus(arrId, 1);
                    } else {
                        this.customerService.updateAllStatus(arrId, 0);
                    }

                    this.customerService.isCloseDialog.subscribe(value => {
                        if (value) {
                            this.getAllCustomer();
                            this.customerService.isCloseDialog.next(false);
                        }
                    })

                    this.selection.deselect(...this.selection.selected)
                    arrId = [];
                } else {
                    this.toastService.warning('Vui lòng chọn khách hàng muốn thay đổi trạng thái !');
                }
            }
        })
    }
}

