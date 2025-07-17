import { Routes } from "@angular/router";
import { AdminDashboardLayoutComponent } from "./layouts/admin-dashboard-layout/admin-dashboard-layout.component";
import { ProductAdminPageComponent } from "./pages/product-admin-page/product-admin-page.component";
import { ProductsAdminPageComponent } from "./pages/products-admin-page/products-admin-page.component";

import { NuevoProductComponent } from "./pages/products-admin-page/nuevo-product/nuevo-product.component";

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    // canMatch: [
    //   IsAdminGuard
    // ],
    children: [
      {
        path: 'products',
        component: ProductsAdminPageComponent,
      },
      {
        path: 'products/:id',
        component: ProductAdminPageComponent
      },
      {
        path: 'nuevo-producto',
        component: NuevoProductComponent
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
]

export default adminDashboardRoutes;

