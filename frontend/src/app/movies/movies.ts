import { Component, OnInit, inject, signal } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie-service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly movies = signal<Movie[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.movieService.getAll().subscribe({
      next: (movies) => {
        this.movies.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las películas. ¿Está corriendo la WebApi?');
        this.loading.set(false);
      },
    });
  }
}
