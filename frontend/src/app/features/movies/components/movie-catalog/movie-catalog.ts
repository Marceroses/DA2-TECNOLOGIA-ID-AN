import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-catalog',
  imports: [FormsModule, RouterLink],
  templateUrl: './movie-catalog.html',
})
export class MovieCatalog {
  private readonly movieService = inject(MovieService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly auth = inject(AuthService);
  protected readonly queryParams = toSignal(inject(ActivatedRoute).queryParamMap);
  protected readonly apiMovies = signal<Movie[] | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly signInError = signal<string | null>(null);
  protected username = '';
  protected password = '';
  protected token = '';

  protected signIn(): void {
    try {
      const success = this.auth.signIn(this.username.trim(), this.password, this.token);
      this.signInError.set(
        success
          ? null
          : 'Revisá el usuario, la contraseña y el token: usá demo/demo y un token ASCII sin espacios.',
      );
    } catch (error) {
      if (
        !(error instanceof DOMException) ||
        (error.name !== 'SecurityError' && error.name !== 'QuotaExceededError')
      ) {
        throw error;
      }

      console.error('No se pudo guardar la sesión en sessionStorage.', error);
      this.signInError.set(
        'No se pudo guardar la sesión. Revisá los permisos o el espacio del navegador.',
      );
    } finally {
      this.password = '';
      this.token = '';
    }
  }

  protected loadFromApi(): void {
    this.apiMovies.set(null);
    this.error.set(null);
    this.loading.set(true);

    this.movieService
      .getAllFromApi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (movies) => {
          if (
            !Array.isArray(movies) ||
            movies.some(
              (movie) =>
                !movie ||
                typeof movie !== 'object' ||
                !Number.isInteger(movie.id) ||
                typeof movie.title !== 'string' ||
                !Number.isFinite(movie.stars) ||
                !Array.isArray(movie.actors) ||
                movie.actors.some(
                  (actor) =>
                    !actor ||
                    typeof actor !== 'object' ||
                    !Number.isInteger(actor.id) ||
                    typeof actor.name !== 'string',
                ),
            )
          ) {
            this.error.set('La API devolvió un formato de películas inválido.');
            this.loading.set(false);
            return;
          }

          this.apiMovies.set(movies);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.error.set(
            error.status === 0
              ? 'No se pudo conectar con la API. Revisá el backend, el puerto y CORS.'
              : `La API respondió con error ${error.status}. Revisá el backend y la base de datos.`,
          );
          this.loading.set(false);
        },
      });
  }
}
