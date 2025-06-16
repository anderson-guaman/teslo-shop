import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path:'**',
    redirectTo:''
  },
]

export default authRoutes;
