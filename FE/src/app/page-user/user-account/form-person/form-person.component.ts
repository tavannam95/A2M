import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { MovieFormComponent } from 'app/page/movies/movie-form/movie-form.component';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { MovieService } from 'app/services/movie/movie.service';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit {
  isLoading: boolean = false;

  titleMess = '';
  title: string = 'Phim';
  categories = [];
  nations = [];
  files: File[] = [];
  imgUrl: any;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataMovie: any;

  formGroup = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    category: [null],
    national: [null],
    time: ['', [Validators.required, Validators.pattern(Regex.number)]],
    poster: [''],
    startDate: [null],
    endDate: [null],
    summary: ['']
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<MovieFormComponent>,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private movieService: MovieService,
    private uploadImageService: CloudinaryService,
  ) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    if (this.dataDialog.type == 'update') {
      this.title = 'Sửa phim';
      this.titleMess = 'Bạn có muốn cập nhật thông tin phim?'
      this.dataMovie = this.dataDialog.row;
      this.categories = this.dataDialog.categories;
      this.nations = this.dataDialog.nations;
      this.formGroup.patchValue(
        {
          fullname: this.dataMovie.name,
          category: this.categories.find(c => c.id == this.dataMovie.category.id),
          national: this.nations.find(c => c.id == this.dataMovie.national.id),
          time: this.dataMovie.time,
          poster: this.dataMovie.poster,
          startDate: new Date(this.dataMovie.startDate),
          endDate: new Date(this.dataMovie.endDate),
          summary: this.dataMovie.summary,
        }
      );
    }
  }
  async uploadImage() {
    if (this.files.length > 0) {
      await this.uploadImg();
    }
    if (this.dataDialog.type == 'update') {

      this.updateMovie();

    }
  }

  async onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: this.titleMess
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.isLoading = true;
        this.uploadImage();
        if (this.dataDialog.type == 'update') {

          this.movieService.updateMovie(this.formGroup.value).subscribe({
            next: res => {
              this.toastrService.success(res.message);
              this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
              this.isLoading = false;

            },
            error: e => {
              console.log(e);

            }
          })

        }
      }
    })
  }

  updateMovie() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn cập nhật thông tin phim?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.isLoading = true;
        // this.notificationService.showNotification('success', 'Sửa thành công !');

      }
    })
  }

  onSelect(event) {
    if (this.files.length > 0) {
      this.files.splice(0, 1);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadImg() {
    const formData = new FormData();
    if (this.files.length > 0) {
      formData.append('files', this.files[0])
    }
    try {
      this.imgUrl = await this.uploadImageService.upload(formData).toPromise();

      this.formGroup.patchValue({ poster: this.imgUrl.data[0] });

    } catch (error) {
      console.log(error);

    }
  }

}
