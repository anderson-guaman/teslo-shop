import { Component, inject } from '@angular/core';
import { ProductTableComponent } from "../../../products/components/product-table/product-table.component";
import { ProductService } from 'src/app/products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService = inject(ProductService)
  router = inject(Router)


  productsResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.productService.getProducts({});
    }
  })

  irANuevoProducto() {
    this.router.navigate(['/admin/nuevo-producto']);
  }
}
