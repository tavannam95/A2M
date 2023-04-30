import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Constant} from '../../../../shared/constants/Constant';
import {MatDialog} from '@angular/material/dialog';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {CategoryService} from '../../../../shared/service/category/category.service';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    displayedColumns: string[] = ['no', 'name',  'createDate', 'updateDate', 'status', 'action'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    TYPE_DIALOG = Constant.TYPE_DIALOG;
    isLoading: boolean;

    constructor(private readonly matDialog: MatDialog,
                private readonly categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.getAllCategory();
    }

    getAllCategory() {
        this.isLoading = true;
        return this.categoryService.getAllCategory().subscribe({
            next: (res: any) => {
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<any>(res);
                this.dataSource.data = res;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                this.isLoading = false;
            }
        })
    }

    onDelete(row) {

    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(CategoryFormComponent, {
            width: '800px',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllCategory();
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
}
