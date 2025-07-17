import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@ANGULAR/forms';
import { IProduct } from 'src/app/products/interfaces/product.interface';
import { ProductService } from 'src/app/products/services/product.service';
import { FormUtils } from 'src/app/utils/forms.utils';

@Component({
  selector: 'app-nuevo-product',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './nuevo-product.component.html',
})
export class NuevoProductComponent {

  sizes = ['S', 'M', 'L', 'XL', 'XXL']
  fb = inject(FormBuilder);
  productService = inject(ProductService);

  productForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    slug: [null, [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [null, [Validators.required, Validators.min(0)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    tags: [['']],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  onSubmit() {
    if (!this.productForm.invalid) {
      const datos = this.productForm.getRawValue();
      const newProduct: IProduct = {
        title: datos.title!,
        price: datos.price!,
        description: datos.description!,
        slug: datos.slug!,
        stock: datos.stock!,
        sizes: datos.sizes!,
        gender: datos.gender!,
        tags: datos.tags!,
        images: [],
      }
      this.productService.crearProducto(newProduct)
      .subscribe({
        next:()=>{
          alert('producto creado con exito')
          this.productForm.reset();
        },
        error:(error)=>{
          alert('error:'+error.message)
        }
      })
    }
  }
}
