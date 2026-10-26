import { Routes } from '@angular/router';
import { Actors } from './actors/actors';
import { Movies } from './movies/movies';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: Movies },
  { path: 'actors', component: Actors },
];
