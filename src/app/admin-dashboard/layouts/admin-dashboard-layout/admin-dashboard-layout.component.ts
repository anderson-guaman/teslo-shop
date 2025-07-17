import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SupabaseAuthService } from 'src/app/auth/services/auth-supabase.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-dashboard-layout.component.html',
})
export class AdminDashboardLayoutComponent {

  authService = inject(AuthService);
  authSupabase = inject(SupabaseAuthService);
  router = inject(Router);

  async logout(){
    try {
      await this.authSupabase.signOut();
      // await this.supabaseService.signIn(email!,password!);
      this.router.navigateByUrl('/')
    } catch (error) {
      alert(error)
      // this.router.navigateByUrl('/')
    }
  }

  user = computed(() => this.authService.user())
}
