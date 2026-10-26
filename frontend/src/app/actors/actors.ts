import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Actor } from './actor';
import { ActorService } from './actor-service';

@Component({
  selector: 'app-actors',
  imports: [RouterLink],
  templateUrl: './actors.html',
  styleUrl: './actors.css',
})
export class Actors implements OnInit {
  private readonly actorService = inject(ActorService);
  private readonly queryParams = toSignal(inject(ActivatedRoute).queryParamMap);

  protected readonly actors = signal<Actor[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly movieId = computed(() => {
    const raw = this.queryParams()?.get('movieId');
    if (!raw) {
      return null;
    }

    const id = Number(raw);
    return Number.isInteger(id) ? id : null;
  });
  protected readonly movieTitle = computed(() => this.queryParams()?.get('title'));
  protected readonly visibleActors = computed(() => {
    const movieId = this.movieId();
    const actors = this.actors();
    if (movieId === null) {
      return actors;
    }

    return actors.filter((actor) => actor.movies.some((movie) => movie.id === movieId));
  });

  ngOnInit(): void {
    this.actorService.getAll().subscribe({
      next: (actors) => {
        this.actors.set(actors);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los actores. ¿Está corriendo la WebApi?');
        this.loading.set(false);
      },
    });
  }
}
