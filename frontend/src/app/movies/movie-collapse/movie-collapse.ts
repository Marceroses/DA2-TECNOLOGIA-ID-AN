import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-collapse',
  template: `
    <details>
      <summary>Mostrar película</summary>
      <p>{{ name() }}</p>
    </details>
  `,
})
export class MovieCollapse {
  readonly name = input('');
}
