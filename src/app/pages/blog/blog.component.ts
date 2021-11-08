import { Component, OnInit } from '@angular/core';
import { IBlogsResponse } from 'src/app/shared/interfaces/blogs.interface';
import { BlogsService } from 'src/app/shared/services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public blogs: Array<IBlogsResponse> = []

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs():void{
    this.blogsService.getAll().subscribe(data => {
      this.blogs = data
    }, err => {
        console.log('error', err);
    })
  }

}
