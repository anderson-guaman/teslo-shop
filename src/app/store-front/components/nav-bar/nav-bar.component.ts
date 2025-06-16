import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {

  authService = inject(AuthService);

 }
