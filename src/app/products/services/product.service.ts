import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IProduct, IProductsResponse } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment.development';

const baseUrl= environment.baseUrl;
interface Options{
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductService {

  private http = inject(HttpClient)

  getProducts(options: Options): Observable<IProductsResponse>{
    const { gender='', limit = 10, offset = 0 } = options;
    return this.http.get<IProductsResponse>(`${baseUrl}/products`,
      {
        params: {
          limit,
          offset,
          gender
        }
      }
    )
    .pipe(tap((res)=>console.log(res)));
  }

  getProduct(filter:string):Observable<IProduct>{
    return this.http.get<IProduct>(`${baseUrl}/products/${filter}`)
  }

  crearProducto(product:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(`${baseUrl}/products`,product)
  }

}
