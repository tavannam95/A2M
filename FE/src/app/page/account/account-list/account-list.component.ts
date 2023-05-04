import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from 'app/services/account/account.service';
import { AccountFormComponent } from '../Account-Dialog/account-form/account-form.component';
import { Constant } from 'app/constants/Constant';
import { UpdateDialogComponent } from '../Account-Dialog/update-dialog/update-dialog.component';
import { AccountDetailComponent } from '../Account-Dialog/account-detail/account-detail.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private matDialog: MatDialog,
    private AccountService: AccountService,
    private toastrService: ToastrService
  ) { }

  displayedColumns: string[] = ['fullname', 'image', 'username', 'email', 'birthDate', 'gender', 'role', 'func'];

  ngOnInit() {
    this.getAllRoom();
  }

  getAllRoom() {
    this.AccountService.getAll().subscribe({
      next: res => {
        res.data.forEach((data) => {
          data.birthDate = new Date(data.birthDate).toLocaleDateString();
        })
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
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

  openDialogForm(type: string, row?: any) {
    this.matDialog.open(AccountFormComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '700px'
    }).afterClosed().subscribe(result => {
      console.log(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAllRoom();
      }
    })
  }

  openUpdateDialogProduct(type: String, row?: any) {
    this.matDialog.open(UpdateDialogComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '700px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAllRoom();
      }
    })
  }

  openDialogProductView(type: string, row: any) {
    this.matDialog.open(AccountDetailComponent, {
      disableClose: true,
      data: {
        type,
        row
      },
      width: '700px'
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
        // ----------------------After close----------------------
      }
    })
  }
}
