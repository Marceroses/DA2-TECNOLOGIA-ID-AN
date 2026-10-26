import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/movies`;

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }
}
