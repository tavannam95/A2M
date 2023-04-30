import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {Constant} from '../../../../shared/constants/Constant';
import {EmployeeFormComponent} from '../employee-form/employee-form.component';
import {EmployeeService} from 'app/shared/service/employee/employee.service'
import {StorageService} from '../../../../shared/service/storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['fullname',  'photo', 'email',  'birthday', 'phone' , 'address', 'role', 'status' ,'control'];
    dataSource = new MatTableDataSource();
    message = ''


    constructor(private dialog: MatDialog ,
                private emService: EmployeeService,
                public storageService: StorageService,
                private readonly toast: ToastrService) {
    }

    ngOnInit(): void {
        this.getAllData() ;
    }

    getAllData( ){
        this.emService.getAllEmployee().subscribe( value => {
            this.dataSource = new MatTableDataSource(value)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialogForm( type: string , row?:any) {
        const dialogRef = this.dialog.open( EmployeeFormComponent , {
            width: '60vw' ,
            disableClose: true ,
            hasBackdrop: true ,
            autoFocus: false ,
            data: {
                type: type,
                row: row
            }
        })

        dialogRef.afterClosed().subscribe( value => {
            if( value === Constant.RESULT_CLOSE_DIALOG.SUCCESS ){
                this.getAllData() ;
            }
        })
    }

    openDialogDelete( status: number , row:any) {
        if( status == 2 ){
            this.message = 'Bạn muốn mở khóa nhân viên này không?'
        }else {
            this.message = 'Bạn muốn xóa nhân viên này không?'
            if(this.storageService.getIdFromToken() === row.id){
                this.toast.error("Bạn không thể vô hiệu hoá chính mình");
                return;
            }
        }
        const dialogRef = this.dialog.open( ConfirmDialogComponent, {
            width: '25vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: this.message
            }
        })

        dialogRef.afterClosed().subscribe( rs => {
             if ( rs === Constant.RESULT_CLOSE_DIALOG.CONFIRM ) {
                 setTimeout( () => {
                     this.emService.updateEmployeeStatus( row )
                     setTimeout( () => {
                         this.getAllData()  ;
                     } , 200)
                 } ,200)
             }
        })
    }

}
