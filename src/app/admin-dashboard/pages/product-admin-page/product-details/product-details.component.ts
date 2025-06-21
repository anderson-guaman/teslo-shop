import { Component, inject, input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/products/interfaces/product.interface';
import { ProductCarouselComponent } from 'src/app/store-front/components/product-carousel/product-carousel.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@ANGULAR/forms';
import { FormUtils } from 'src/app/utils/forms.utils';


@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit{
  product = input.required<IProduct>();
  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    slug: [null, [Validators.required, Validators.pattern(FormUtils.slugPattern)] ],
    price: [null, [Validators.required, Validators.min(0)] ],
    stock: [null, [Validators.required, Validators.min(0)] ],
    sizes: [['']],
    images: [['']],
    tags:[''],
    gender: ['men',[Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes = ['S','M','L','XL','XXL']

  ngOnInit(): void {
    this.setFormValue(this.product())
  }

  setFormValue(formLike: Partial<IProduct>){
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')})
  }

  onSubmit(){
    console.log(this.productForm.value)
  }
}
