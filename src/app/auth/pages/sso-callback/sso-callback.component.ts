import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseAuthService } from '../../services/auth-supabase.service';
// import { supabase } from '../../supabase.client';

@Component({
  selector: 'app-sso-callback',
  imports: [],
  templateUrl: './sso-callback.component.html',
})
export class SsoCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseAuthService
  ) { }

  async ngOnInit() {
    const accessToken = this.route.snapshot.queryParamMap.get('access_token');
    console.log(accessToken);
    if (accessToken) {
      // try {
      //   // Establece sesión en Supabase
      //   await this.supabaseService.setSession( accessToken , '');
      //   // Redirige al dashboard
      //   this.router.navigate(['/admin']);
      // } catch (error) {
      //   console.error('Error al establecer sesión:', error);
      //   // this.router.navigate(['/login']);
      //   this.router.navigate(['/sso-callback']);
      // }
      // ⚡ Guardar en sessionStorage o localStorage
      // sessionStorage.setItem('supabaseAccessToken', accessToken);


      // localStorage.setItem('supabaseAccessToken', accessToken);

      this.supabaseService.setAccessToken(accessToken);
      this.router.navigate(['/admin']);
    } else {
      // No viene token -> manda al login local
      this.router.navigate(['/sso-callback']);
    }
  }
}
