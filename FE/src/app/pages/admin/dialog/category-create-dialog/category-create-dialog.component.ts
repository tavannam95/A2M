import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Regex } from '../../../../shared/validators/Regex';
import { CategoryService } from '../../../../shared/service/category/category.service';

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['./category-create-dialog.component.scss']
})
export class CategoryCreateDialogComponent implements OnInit {

  categoryFormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    status: 1
  });

  constructor(
      private dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
      private fb: FormBuilder,
      private categoryService: CategoryService,
    ) { }

  ngOnInit() {
  }

  createCategory(){
    this.categoryService.createCategory(this.categoryFormGroup.value);
    this.dialogRef.close('Close');
  }

}
