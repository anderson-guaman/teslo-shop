import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@ANGULAR/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  hasError = signal(false);

  registerForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    nombre: [null, Validators.required]
  })


  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    };
    const { email, password, nombre } = this.registerForm.value;
    this.authService.register(email!, password!, nombre!)
      .subscribe((response) => {
        if (response) {
          this.router.navigateByUrl('/')
          return;
        }
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false)
        }, 2000);
      });
  }
}
