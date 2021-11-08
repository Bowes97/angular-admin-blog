import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategorysResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategorys: Array<ICategorysResponse> = [];
  public currentCategory!: ICategorysResponse;
  public currentCategoryID!: number;
  public editStatus = false;
  public categoryForm!: FormGroup;
  public field = '';
  public filter = '';

  constructor(private categortService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initCategoryForm()
    this.loadCategory();
  }

  initCategoryForm(): void{
    this.categoryForm = this.fb.group({
      name: [null, Validators.required]
    })
  }

  loadCategory():void{
    this.categortService.getAll().subscribe( data => {
      this.adminCategorys = data;
    }, err => {
      console.log('error', err);
      
    })
  }

  saveCategory(): void{
    if(this.editStatus){
      this.categortService.update(this.categoryForm.value, this.currentCategoryID).subscribe(()=> {
        this.loadCategory();
        this.editStatus = false;
        this.initCategoryForm();
      }, err => {
        console.log('error',err);
        
      })
    }else{
      this.categortService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategory();
        this.field = '';
      }, err => {
        console.log('error',err);
      })
    }
  }

  editBlogs(c:ICategorysResponse): void{
    this.categoryForm.patchValue({
      name: c.name
    })
    this.currentCategoryID = c.id;
    this.editStatus = true;
  }
  deleteBlogs(c:ICategorysResponse): void{
    this.categortService.delete(c.id).subscribe(() => {
      this.loadCategory();
    }, err => {
      console.log('error', err);
    })
  }
}
