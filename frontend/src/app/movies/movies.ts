import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Movie } from './movie';
import { MovieCollapse } from './movie-collapse';
import { MovieService } from './movie-service';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCollapse],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  protected readonly movies = signal<Movie[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected openActors(movie: Movie): void {
    void this.router.navigate(['/actors'], {
      queryParams: { movieId: movie.id, title: movie.title },
    });
  }

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
