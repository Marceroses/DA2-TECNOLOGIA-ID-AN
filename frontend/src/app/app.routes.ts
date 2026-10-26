import { Routes } from '@angular/router';
import { Movies } from './movies/movies';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: Movies },
  // TODO (en clase): agregar la ruta 'actors' con el componente Actors.
];
