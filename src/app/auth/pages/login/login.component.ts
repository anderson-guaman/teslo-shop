import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators} from '@ANGULAR/forms'
import { AuthService } from '../../services/auth.service';
import { SupabaseAuthService } from '../../services/auth-supabase.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)
  supabaseService = inject(SupabaseAuthService)

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: [ null, [ Validators.required, Validators.email ] ],
    password: [ null, [ Validators.required, Validators.minLength(6) ] ]
  });

  async onSubmit(){
    if( this.loginForm.invalid ){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    };
    const {email, password} = this.loginForm.value;
    // this.authService.login(email!,password!)
    // .subscribe( (response) => {
    //   if(response){
    //     this.router.navigateByUrl('/')
    //     return;
    //   }
    //   this.hasError.set(true);
    //   setTimeout(() => {
    //     this.hasError.set(false)
    //   }, 2000);
    // });

    try {
      await this.supabaseService.signIn(email!,password!);
      this.router.navigateByUrl('/admin')
    } catch (error) {
      alert(error)
      // this.router.navigateByUrl('/')
    }
  }

  // check Authentication

  // Register

  //Logaout

}
