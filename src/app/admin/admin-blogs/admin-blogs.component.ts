import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBlogsResponse } from 'src/app/shared/interfaces/blogs.interface';
import { BlogsService } from 'src/app/shared/services/blogs.service';


@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {

  public adminBlogs: Array<IBlogsResponse> = [];
  public currentBlogs!: IBlogsResponse;
  public currentBlogsID!: number;
  public editStatus = false;
  public blogsForm!: FormGroup;
  public date = new Date;


  constructor(private blogsService: BlogsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initBlogsForm();
    this.loadBlogs();
  }

  initBlogsForm(): void{
    this.blogsForm = this.fb.group({
      title: [null, Validators.required],
      postedBy: [null, Validators.required],
      text: [null, Validators.required],
      imagePath: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAKVSb4CHkO5FFvvfwhIwG_UpIl7s2NvAIyg&usqp=CAU", Validators.required],
      date: [this.date, Validators.required]
    })
  }


  loadBlogs(): void{
    this.blogsService.getAll().subscribe( data => {
      this.adminBlogs = data;
      console.log(this.adminBlogs);
      
    },err => {
      console.log('error', err);
    })
  }

  saveDiscount(): void {
    if(this.editStatus){
      this.blogsService.update(this.blogsForm.value, this.currentBlogsID).subscribe(()=> {
        this.loadBlogs();
        this.editStatus = false;
        this.initBlogsForm();
      }, err => {
        console.log('error', err);
        
      })
    }else{
      this.blogsService.create(this.blogsForm.value).subscribe(()=> {
        this.loadBlogs();
      }, err => {
        console.log('error',err);
      })
    }
  }


  deleteBlogs(blogs: IBlogsResponse): void{
    this.blogsService.delete(blogs.id).subscribe(() => {
      this.loadBlogs();
    }, err =>{
      console.log('delete discount error', err);
      
    })
  }
  editBlogs(blogs: IBlogsResponse): void{
    this.blogsForm.patchValue({
      title: blogs.title,
      text: blogs.text,
      postedBy: blogs.postedBy,
      imagePath: blogs.imagePath,
      date: blogs.date
    })
    this.currentBlogsID = blogs.id;
    this.editStatus = true;
  }
}
