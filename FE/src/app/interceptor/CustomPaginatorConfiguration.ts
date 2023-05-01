import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Hiển thị:';
    customPaginatorIntl.firstPageLabel = 'Trang đầu';
    customPaginatorIntl.lastPageLabel = 'Trang cuối';
    customPaginatorIntl.nextPageLabel = 'Trang sau';
    customPaginatorIntl.previousPageLabel = 'Trang trước';
    
    return customPaginatorIntl;
  }