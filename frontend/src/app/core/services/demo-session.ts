import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoSession {
  // ponytail: acceso de ejemplo en memoria; usar autenticación del servidor en producción.
  private readonly active = signal(false);
  readonly signedIn = this.active.asReadonly();

  signIn(username: string, password: string): boolean {
    if (username !== 'demo' || password !== 'demo') {
      return false;
    }

    this.active.set(true);
    return true;
  }

  signOut(): void {
    this.active.set(false);
  }
}
