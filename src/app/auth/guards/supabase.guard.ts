import { Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { SupabaseAuthService } from '../services/auth-supabase.service';
// import { SupabaseAuthService } from './supabase-auth.service';

export const supabaseGuard: CanActivateFn = (route, state) => {
  const authService = inject(SupabaseAuthService);
  const router = inject(Router);

  return authService.session$.pipe(
    take(1),
    map(session => {
      if (session) {
        // Hay sesión → permitir acceso
        return true;
      } else {
        // No hay sesión → redirigir al login
        return router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    })
  );
};
