import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { supabaseGuard } from './auth/guards/supabase.guard';
import { SsoGuard } from './auth/guards/sso-supabase.guard';
import { SsoCallbackComponent } from './auth/pages/sso-callback/sso-callback.component';
// import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  //
  { path: 'sso-callback',
    component: SsoCallbackComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    canActivate: [SsoGuard]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
    // loadChildren: () => import('./store-front/store-front.routes')
  }
];
