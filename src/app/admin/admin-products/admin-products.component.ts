import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategorysResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/products.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  public adminCategorys: Array<ICategorysResponse> = [];
  public currentCategory!: ICategorysResponse;
  public currentCategoryID!: number;

  public adminProducts: Array<IProductResponse> = [];
  public currentProduct!: IProductResponse;
  public currentProductID!: number;
  public editStatus = false;
  public productForm!: FormGroup;
  public field = '';
  public field1 = '';
  public field2 = '';
  public filter = '';
  
  public isUploaded = false;
  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategory();
    this.loadProduct();
  }

  initProductForm(): void{
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  loadCategory():void{
    this.categoryService.getAll().subscribe( data => {
      this.adminCategorys = data;
    }, err => {
      console.log('error', err);
    })
  }

  loadProduct():void{
    this.productService.getAll().subscribe( data => {
      this.adminProducts = data;
    }, err => {
      console.log('error', err);
    })
  }

  saveProduct(): void{
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentCategoryID).subscribe(()=> {
        this.loadProduct();
        this.editStatus = false;
        this.initProductForm();
      }, err => {
        console.log('error',err);
        
      })
    }else{
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.field = '';
      }, err => {
        console.log('error',err);
      })
    }
  }

  editProduct(p:IProductResponse): void{
    this.productForm.patchValue({
      name: p.name,
      price: p.price,
      description: p.description,
      imagePath: p.imagePath,
      category: p.category,
    })
    this.currentCategoryID = p.id;
    this.editStatus = true;
  }
  deleteProduct(p:IProductResponse): void{
    this.productService.delete(p.id).subscribe(() => {
      this.loadProduct();
    }, err => {
      console.log('error', err);
    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('product', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          return await getDownloadURL(storageRef);
        } catch (e: any) {
          return e.message
        }
      } else {
        return '';
      }
    }
  }
  deleteImage(imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      console.log('File deleted successfully');
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
  

}
