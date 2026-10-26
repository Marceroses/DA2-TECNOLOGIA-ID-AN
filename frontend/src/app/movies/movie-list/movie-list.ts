import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../../entities/movie';
import { MovieCollapse } from '../movie-collapse/movie-collapse';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink, MovieCollapse],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
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
