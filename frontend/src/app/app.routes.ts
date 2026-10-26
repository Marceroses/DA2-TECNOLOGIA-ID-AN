import { Routes } from '@angular/router';
import { Actors } from './actors/actors';
import { MovieDetail } from './movies/movie-detail';
import { Movies } from './movies/movies';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: Movies },
  { path: 'movies/:id', component: MovieDetail },
  { path: 'actors', component: Actors },
];
