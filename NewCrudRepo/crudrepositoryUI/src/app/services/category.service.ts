import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private baseUrl = "https://localhost:44319/api/Category/";

  addCate(add:any):Observable<Category>
  {
    return this.http.post<Category>(this.baseUrl + 'create',add);
  }

  editCategory(id:string,editreq:Category):Observable<Category>
  {
      return this.http.put<Category>(this.baseUrl + 'update/' + id,editreq);
  }

  deleteCategory(id:string):Observable<Category>
  {
    return this.http.delete<Category>(this.baseUrl + 'delete/' + id);
  }
  getCatebyId(id:string):Observable<Category>
  {
    return this.http.get<Category>(this.baseUrl + 'find/' + id);
  }
  getCate():Observable<Category[]>
  {
    return this.http.get<Category[]>(this.baseUrl + 'findall');
  }

}
