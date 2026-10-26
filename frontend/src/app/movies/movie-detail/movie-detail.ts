import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../entities/movie';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);

  protected readonly movie = signal<Movie | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!Number.isInteger(id)) {
        this.movie.set(null);
        this.error.set('Id inválido.');
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.error.set(null);
      this.movieService.getById(id).subscribe({
        next: (movie) => {
          this.movie.set(movie);
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.movie.set(null);
          this.error.set(
            err.status === 404
              ? 'La película no existe.'
              : 'No se pudo cargar la película. ¿Está corriendo la WebApi?',
          );
          this.loading.set(false);
        },
      });
    });
  }
}
