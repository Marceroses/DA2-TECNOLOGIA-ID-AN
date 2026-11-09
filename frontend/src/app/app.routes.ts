import { Routes } from '@angular/router';
import { demoSessionGuard } from './core/guards/demo-session.guard';
import { ActorList } from './features/actors/components/actor-list/actor-list';
import { MovieCatalog } from './features/movies/components/movie-catalog/movie-catalog';
import { MovieDetail } from './features/movies/components/movie-detail/movie-detail';
import { MovieList } from './features/movies/components/movie-list/movie-list';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieList },
  { path: 'movies/:id', component: MovieDetail },
  { path: 'actors', component: ActorList },
  { path: 'catalog/actors', component: ActorList, canActivate: [demoSessionGuard] },
  { path: 'catalog', component: MovieCatalog },
];
