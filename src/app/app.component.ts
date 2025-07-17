import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseAuthService } from './auth/services/auth-supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'teslo-shop';

  // constructor(private auth: SupabaseAuthService) {
  //   this.auth.session$.subscribe(session => {
  //     console.log('User session changed:', session);
  //   });
  // }
}
