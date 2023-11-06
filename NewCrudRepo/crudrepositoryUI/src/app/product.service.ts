import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private baseUrl = "https://localhost:44319/api/Product/";
  readonly imageUrl = "https://localhost:44319/Images/"
  
  constructor(private http:HttpClient) { }

  addProduct(addpro:any):Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl + 'create',addpro);
  }

  getAllProduct():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseUrl + 'findall');
  }

  getProduct(id:string):Observable<Product>
  {
    return this.http.get<Product>(this.baseUrl + 'find/' + id);
  }

  deleteProduct(id:number):Observable<Product>
  {
    return this.http.delete<Product>(this.baseUrl + 'delete/' + id);
  }

  updateProduct(id:number,editreq:FormData):Observable<any>
  {
    return this.http.put<any>(this.baseUrl + 'update/' + id,editreq);
  }
}
