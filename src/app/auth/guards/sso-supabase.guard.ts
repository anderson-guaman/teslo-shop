import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseAuthService } from '../services/auth-supabase.service';

// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

@Injectable({
  providedIn: 'root'
})
export class SsoGuard implements CanActivate {

  constructor(
    private router: Router,
    private supabaseAuth: SupabaseAuthService
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {

    const token = sessionStorage.getItem('supabaseAccessToken');
    // const { data: { session } } = await supabase.auth.getSession();
    // const session = await this.supabaseAuth.getSession();

    if (token) {
    // if (session) {
      // Sesión válida
      return true;
    } else {
      // No hay sesión -> redirigir al login central
      // window.location.href = 'http://localhost:3000';
      window.location.href = `http://localhost:3000/login?redirect_uri=${encodeURIComponent('http://localhost:4200/sso-callback')}`;

      return false;
    }
  }
}
