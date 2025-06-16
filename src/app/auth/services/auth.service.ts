import { computed, inject, Injectable, signal } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<IUser | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  // tan pronto el servicio se monte se lanza la petición
  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() == 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed<IUser | null>(() => this._user());
  token = computed(this._token)

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthError(error)),
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    };
    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).pipe(
        map(response => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error)),
      )
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated')

    //TODO: revertir
    localStorage.removeItem('token')
  }

  register( email:string, password:string,nombre:string):Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      email,
      password,
      fullName:nombre
    }).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthError(error)),
    )
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token)
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
