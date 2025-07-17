import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layouts/store-front-layout/store-front-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { GenderComponent } from "./pages/gender/gender.component";
import { ProductComponent } from "./pages/product/product.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'gender/:gender',
        component: GenderComponent
      },
      {
        path: 'product/:id',
        component: ProductComponent
      },
      {
        path: '**',
        component: NotFoundPageComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

export default storeFrontRoutes;
