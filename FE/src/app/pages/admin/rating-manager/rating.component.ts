import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {RatingService} from '../../../shared/service/rating/rating.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {Constant} from '../../../shared/constants/Constant';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})

export class RatingComponent implements OnInit {
    array: any[] = [];
    displayedColumns: string[] = ['select', 'image', 'content'];
    dataSource: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection = new SelectionModel<any>(true, []);
    listImageRating: any;

    constructor(private ratingService: RatingService,
                private toast: ToastrService,
                private dialog: MatDialog,
                private  change: ChangeDetectorRef) {
        this.getAllRating();
    }

    getAllRating() {
        return this.ratingService.getRatings().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<any>(data);
            this.isAllSelected();
            if (data.length > 0) {
                this.getAllRatingImage(data);
            }
        })
    }

    getAllRatingImage(data: any) {
        return this.ratingService.getRatingsImage(data).subscribe(value => {
            this.listImageRating = value;
        })
    }

    takeListImage(id: number) {
        let arr: any[] = [];
        for (let x of this.listImageRating) {
            if (id == x.rating.id) {
                arr.push(x)
            }
        }
        return arr;
    }

    approveRating() {
        this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn duyệt đánh giá?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
                this.ratingService.updateRating(this.array).subscribe({
                    next: () => {
                        this.toast.success('Duyệt thành công');
                        this.array = [];
                        this.getAllRating();
                    },
                    error: () => {
                        this.toast.error('Duyệt thất bại. Vui lòng thử lại sau');
                    }
                });
            }
        })
        // this.toast.
        
    }

    deleteRating() {
        
        
        this.dialog.open(ConfirmDialogComponent, {
            hasBackdrop: true,
            width: '30vw',
            disableClose: true,
            data: {
                message: 'Bạn có chắc muốn xóa chứ ?',
                title: 'Xác nhận'
            }
        }).afterClosed().subscribe(value => {
            if (value == Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
                this.ratingService.deleteRating(this.array).subscribe({
                    next: () => {
                        this.toast.success('Xóa thành công');
                        this.array = [];
                        this.getAllRating();
                        this.selection.deselect(...this.selection.selected);
                    },
                    error: () => {
                        this.toast.error('Xóa thất bại');
                    }
                })
            }
        })

    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        if (this.dataSource?.data.length > 0) {
            this.dataSource.paginator = this.paginator;
        }
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

        if (this.selection.isSelected(row) && this.checkExit(row)) {
            this.array.push(row)
        } else {
            if (this.selection.isSelected(row) == false && this.checkExit(row) == false) {
                this.array = this.array.filter(x => x.id != row.id)
            }
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
    }

    checkExit(row: any) {
        for (let x of this.array) {
            if (x.id == row.id) {
                return false
            }
        }
        return true;
    }

}
