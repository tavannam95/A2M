import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { NationService } from 'app/services/nation/nation.service';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { MovieService } from 'app/services/movie/movie.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'app/services/categories/categories.service';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  isLoading: boolean = false;

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
    id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    category: [null],
    national: [null],
    time: ['', [Validators.required, Validators.pattern(Regex.number)]],
    poster: [''],
    startDate: [''],
    endDate: [''],
    summary: ['']
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<MovieFormComponent>,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private nationService: NationService,
    private movieService: MovieService,
    private categoriesService: CategoriesService,
    private uploadImageService: CloudinaryService,
  ) { }

  ngOnInit(): void {
    this.onInit();
    this.getAllNation();
    this.getAllCategories();
  }

  getAllNation(){
    
    this.isLoading = true;
    this.nationService.getAll().subscribe({
      next: res =>{
        this.dataSource = new MatTableDataSource<any>(res);
        this.nations = this.dataSource.data;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
        this.isLoading = false;
      },
      error: e =>{
        console.log(e);
        this.isLoading = false;
      }
    })
  } 
  getAllCategories(){
    
    this.isLoading = true;
    this.categoriesService.getAll().subscribe({
      next: res =>{
        this.dataSource = new MatTableDataSource<any>(res);
        this.categories = this.dataSource.data;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
        this.isLoading = false;
      },
      error: e =>{
        console.log(e);
        this.isLoading = false;
      }
    })
  } 

  onInit(){
    // console.log(this.dataDialog);
    if (this.dataDialog.type=='create') {
      this.title = 'Thêm phim';
    }
    if (this.dataDialog.type=='update') {
      this.title = 'Sửa phim';
      this.dataMovie = this.dataDialog.row;
      console.log(this.dataMovie);
      this.formGroup.patchValue(
          {
            id:this.dataMovie.id,
            name: this.dataMovie.name, 
            category: this.dataMovie.category.name,
            national: this.dataMovie.nation,
            time: this.dataMovie.time,
            poster: this.dataMovie.poster,
            startDate: this.dataMovie.startDate,
            endDate: this.dataMovie.endDate,
            summary: this.dataMovie.summary,
          }
        );
    }
  }

  async onSubmit(){
    this.isLoading = true;
    if (this.files.length > 0) {
      await this.uploadImg();
    }
    if (this.dataDialog.type=='create') {

      this.createMovie();

    }

    if (this.dataDialog.type=='update') {
      
      this.updateMovie();

    }
  
  }

  createMovie(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn thêm mới phim?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
            // this.notificationService.showNotification('success', 'Thêm thành công !');
            this.movieService.createMovie(this.formGroup.value).subscribe({
              next: res =>{
                console.log(res);
                this.toastrService.success(res.message);
                this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.isLoading = false;
              },
              error: e =>{
                console.log(e);
                
              }
            })
        }
    })
  }

  updateMovie(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn cập nhật thông tin phim?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;
            console.log(this.formGroup.value);
            // this.notificationService.showNotification('success', 'Thêm thành công !');
            this.movieService.updateMovie(this.formGroup.value).subscribe({
              next: res =>{
                console.log(res);
                this.toastrService.success(res.message);
                this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.isLoading = false;
              },
              error: e =>{
                console.log(e);
                
              }
            })
        }
    })
  }

  onSelect(event) {
		console.log(event);
    if (this.files.length > 0) {
      this.files.splice(0,1);
    }
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  async uploadImg(){
    const formData = new FormData();
    if (this.files.length>0) {
      formData.append('files',this.files[0])
    }
    try {
      this.imgUrl = await this.uploadImageService.upload(formData).toPromise();
      console.log(this.imgUrl.data[0]);
      
      this.formGroup.patchValue({poster: this.imgUrl.data[0]});
      console.log(this.imgUrl);
      
    } catch (error) {
      console.log(error);
      
    }
  }
}
