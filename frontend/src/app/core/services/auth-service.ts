import { Injectable, signal } from '@angular/core';

const SESSION_TOKEN_KEY = 'cine.apiToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // acceso de ejemplo; usar autenticación del servidor en producción.
  private readonly active = signal(Boolean(this.getToken()));
  readonly signedIn = this.active.asReadonly();

  signIn(username: string, password: string, token: string): boolean {
    const cleanToken = token.trim();
    if (username !== 'demo' || password !== 'demo' || !/^[\x21-\x7e]+$/.test(cleanToken)) {
      return false;
    }

    sessionStorage.setItem(SESSION_TOKEN_KEY, cleanToken);
    this.active.set(true);
    return true;
  }

  getToken(): string | null {
    return sessionStorage.getItem(SESSION_TOKEN_KEY);
  }

  signOut(): void {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    this.active.set(false);
  }
}
