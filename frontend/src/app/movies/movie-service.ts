import { HttpErrorResponse } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
// import { environment } from '../../environments/environment';
import { Movie } from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  // private readonly http = inject(HttpClient);
  // private readonly url = `${environment.apiUrl}/movies`;
  private readonly movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      stars: 5,
      actors: [{ id: 1, name: 'Leonardo DiCaprio' }],
    },
    {
      id: 2,
      title: 'The Matrix',
      stars: 5,
      actors: [{ id: 2, name: 'Keanu Reeves' }],
    },
    { id: 3, title: 'Pelicula sin actores', stars: 3, actors: [] },
  ];

  getAll(): Observable<Movie[]> {
    // return this.http.get<Movie[]>(this.url);
    return of(this.movies);
  }

  getById(id: number): Observable<Movie> {
    // return this.http.get<Movie>(`${this.url}/${id}`);
    const movie = this.movies.find((movie) => movie.id === id);
    return movie
      ? of(movie)
      : throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }));
  }
}
