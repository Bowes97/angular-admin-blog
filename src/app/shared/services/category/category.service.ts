import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogsRequest } from '../../interfaces/blogs.interface';
import { ICategorysRequest, ICategorysResponse } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL
  private api = {
    categorys: `${this.url}/categorys`
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICategorysResponse[]>{
    return this.http.get<ICategorysResponse[]>(this.api.categorys)
  }
  getOne(id: number): Observable<ICategorysResponse>{
    return this.http.get<ICategorysResponse>(`${this.api.categorys}/${id}`)
  }
  create(categorys: ICategorysRequest): Observable<void> {
    return this.http.post<void>(this.api.categorys, categorys)
  }
  update(categorys: IBlogsRequest, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.categorys}/${id}`, categorys)
  }
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.categorys}/${id}`)
  }
}
