import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [
    ProductDetailsComponent
],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  productId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );
  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.productService.getProduct(request.id);
    }
  });
  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products'])
    }
  })
}
