import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Actor } from './actor';

@Injectable({ providedIn: 'root' })
export class ActorService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/actors`;

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.url);
  }
}
