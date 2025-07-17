import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, AuthChangeEvent, User } from '@supabase/supabase-js';
// import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabase: SupabaseClient;

  private sessionSubject = new BehaviorSubject<Session | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );

    // Inicializa la sesión actual
    this.loadSession();

    // Suscribirse a cambios de Auth (sign in, sign out, refresh)
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth change event:', event);
      this.sessionSubject.next(session);
    });
  }

  /** Sign Up with email and password */
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  /** Sign In with email and password */
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    this.sessionSubject.next(data.session);
    return data;
  }

  /** Sign Out the current user */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    sessionStorage.clear();
    if (error) throw error;
    this.sessionSubject.next(null);
  }

  /** Get current session (JWT etc.) */
  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async setSession(access_token: string, refresh_token: string = '') {
    await this.supabase.auth.signOut(); // limpia el lock
    const { data, error } = await this.supabase.auth.setSession({
      access_token,
      refresh_token
    });
    if (error) throw error;
    this.sessionSubject.next(data.session);
    return data.session;
  }


  /** Get current user info */
  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }

  /** Load initial session at app start */
  private async loadSession() {
    const { data } = await this.supabase.auth.getSession();
    this.sessionSubject.next(data.session);
  }

  /** Access underlying supabase client (advanced) */
  get client() {
    return this.supabase;
  }
  setAccessToken(token: string) {
    sessionStorage.setItem('supabaseAccessToken', token);
    // O localStorage
  }
  getAccessToken(): string | null {
    return sessionStorage.getItem('supabaseAccessToken');
    // O si usas localStorage:
    // return localStorage.getItem('supabaseAccessToken');
  }
  getClient(): SupabaseClient {
    const token = this.getAccessToken();

    return createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }
    });
  }
}
