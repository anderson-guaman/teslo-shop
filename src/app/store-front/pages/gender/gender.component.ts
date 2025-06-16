import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-gender',
  imports: [ProductCardComponent],
  templateUrl: './gender.component.html',
})
export class GenderComponent {

  route = inject(ActivatedRoute)
  productService = inject(ProductService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
    )
  );

  products = rxResource({
    request: ()=>({gender: this.gender()}),
    loader: ({request}) => {
      return this.productService.getProducts({gender:request.gender});
    },
  });
}
