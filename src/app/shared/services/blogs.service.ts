import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogsRequest, IBlogsResponse } from '../interfaces/blogs.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private url = environment.BACKEND_URL;
  private api = {
    blogs: `${this.url}/blogs`
  }

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<IBlogsResponse[]> {
    return this.http.get<IBlogsResponse[]>(this.api.blogs)
  }

  getOne(id: number): Observable<IBlogsResponse>{
    return this.http.get<IBlogsResponse>(`${this.api.blogs}/${id}`)
  }
  create(blogs: IBlogsRequest): Observable<void>{
    return this.http.post<void>(this.api.blogs, blogs)
  }
  update(blogs: IBlogsRequest, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.blogs}/${id}`, blogs)
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.api.blogs}/${id}`)
  }
}
