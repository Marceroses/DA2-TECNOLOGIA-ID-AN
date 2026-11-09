import { Component } from '@angular/core';
import { MainLayout } from './layouts/main-layout/main-layout';

@Component({
  imports: [MainLayout],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
