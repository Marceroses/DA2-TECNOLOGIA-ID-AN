// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { environment } from '../../environments/environment';
import { Actor } from './actor';

@Injectable({ providedIn: 'root' })
export class ActorService {
  // private readonly http = inject(HttpClient);
  // private readonly url = `${environment.apiUrl}/actors`;
  private readonly actors: Actor[] = [
    {
      id: 1,
      name: 'Leonardo DiCaprio',
      movies: [{ id: 1, title: 'Inception', stars: 5 }],
    },
    {
      id: 2,
      name: 'Keanu Reeves',
      movies: [{ id: 2, title: 'The Matrix', stars: 5 }],
    },
  ];

  getAll(): Observable<Actor[]> {
    // return this.http.get<Actor[]>(this.url);
    return of(this.actors);
  }
}
