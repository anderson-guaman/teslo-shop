import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductService } from '../../../products/services/product.service';
import { IProduct } from '../../../products/interfaces/product.interface';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private productService = inject(ProductService);
  productos = signal<IProduct[]>([]);

  constructor(){
    this.productService.getProducts({limit:20}).subscribe({
      next:(res)=>{
        this.productos.set(res.products)
      }
    });
  }
}
