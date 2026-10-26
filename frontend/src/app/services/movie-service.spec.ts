import { firstValueFrom } from 'rxjs';
import { ActorService } from './actor-service';
import { MovieService } from './movie-service';

describe('Dummy services', () => {
  it('returns movies, matching actors and a 404 for missing movies without HTTP', async () => {
    const service = new MovieService();
    const movies = await firstValueFrom(service.getAll());
    const actors = await firstValueFrom(new ActorService().getAll());

    expect(movies.length).toBeGreaterThan(0);
    for (const movie of movies) {
      expect(await firstValueFrom(service.getById(movie.id))).toEqual(movie);
      for (const actor of movie.actors) {
        const matchingActor = actors.find((item) => item.id === actor.id);
        expect(matchingActor?.name).toBe(actor.name);
        expect(matchingActor?.movies).toContainEqual({
          id: movie.id,
          title: movie.title,
          stars: movie.stars,
        });
      }
    }

    await expect(firstValueFrom(service.getById(999))).rejects.toMatchObject({ status: 404 });
  });
});
