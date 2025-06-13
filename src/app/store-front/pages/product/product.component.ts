import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/products/interfaces/product.interface';
import { ProductService } from 'src/app/products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop'
import { ProductCarouselComponent } from "../../components/product-carousel/product-carousel.component";


@Component({
  selector: 'app-product',
  imports: [ProductCarouselComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  activeRoute =  inject(ActivatedRoute)
  productService = inject(ProductService)

  productSlug = this.activeRoute.snapshot.paramMap.get('id');

  productResource = rxResource({
    request: ()=>({id: this.productSlug}),
    loader: ({request}) => {
      return this.productService.getProduct(request.id!)
    }
  });


}


