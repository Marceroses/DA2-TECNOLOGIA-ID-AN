import { Routes } from '@angular/router';
import { ActorList } from './actors/actor-list/actor-list';
import { MovieDetail } from './movies/movie-detail/movie-detail';
import { MovieList } from './movies/movie-list/movie-list';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieList },
  { path: 'movies/:id', component: MovieDetail },
  { path: 'actors', component: ActorList },
];
