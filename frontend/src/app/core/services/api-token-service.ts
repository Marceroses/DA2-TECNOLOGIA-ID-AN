import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiTokenService {
  // ponytail: token solo en memoria; usar una sesión segura cuando exista un login real.
  private readonly currentToken = signal<string | null>(null);
  readonly token = this.currentToken.asReadonly();

  setToken(value: string): boolean {
    const token = value.trim();
    if (!/^[\x21-\x7e]+$/.test(token)) {
      return false;
    }

    this.currentToken.set(token);
    return true;
  }

  clear(): void {
    this.currentToken.set(null);
  }
}
