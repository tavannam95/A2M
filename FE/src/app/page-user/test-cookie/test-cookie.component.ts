import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-cookie',
  templateUrl: './test-cookie.component.html',
  styleUrls: ['./test-cookie.component.scss']
})
export class TestCookieComponent implements OnInit {
  fileToUpload: File | null = null;
  fileRes: any;

  formGroup = this.fb.group({
    files: ['']
  })

  constructor(
    private fb: FormBuilder,
    private cookie2Service: Cookie2Service,
    private toastrService: ToastrService,
    private http: HttpClient,
    private jwtService: JwtService,
    private uploadService: CloudinaryService
  ) { }

  ngOnInit() {
  }

  files: File[] = [];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;
  }
  

  upload(){
    // if (!this.fileToUpload) {
    //   return;
    // }
    const formData = new FormData();
    formData.append('files', this.fileToUpload);
    
    // const formData = new FormData();
    //   formData.append('files', this.files[0]);
    this.fileRes =  this.uploadService.upload(formData).toPromise();
    
  }

  uploadDrop(){
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.uploadService.upload(formData).subscribe({
      next: res =>{
        this.fileRes =  res;
        
      },
      error: e =>{
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
        
      }
    });
  }

  checkRes(){
    
  }

	onSelect(event) {
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  
}
