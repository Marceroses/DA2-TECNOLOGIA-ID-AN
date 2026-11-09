# Cine frontend — guía para la clase 9

Guía práctica basada en [Clase 9: Avanzados Angular](https://material-trail-def.notion.site/Clase-9-Avanzados-Angular-45b50be2bb9a836fbcbd81c3f140e55b). Los ejemplos usan el proyecto de películas y actores de este repositorio.

## 1. Preparar el proyecto

Necesitás una versión de Node compatible con Angular CLI 22: `^22.22.3`, `^24.15.0` o `>=26.0.0`. Si usás `nvm` y ya tenés Node 22.22.3, activalo con `nvm use 22.22.3`. Luego, desde la raíz del repositorio:

```bash
cd frontend
npm ci
npm start
```

Abrí <http://localhost:4200/> y elegí **Catálogo** en el menú. Las pantallas normales de películas y actores funcionan sin backend: usan datos de ejemplo en los servicios.

Para la consulta HTTP real, iniciá también el backend en otra terminal, desde la raíz del repositorio:

```bash
cd backend
dotnet run --project CineWebApi --launch-profile http
```

El backend necesita .NET 10 y SQL Server configurado mediante `ConnectionStrings:CineDb`, con las migraciones aplicadas. Para una base **local de desarrollo**, con `dotnet-ef` instalado, podés aplicar las migraciones existentes en otra terminal desde la raíz del repositorio:

```bash
cd backend
dotnet ef database update --project Cine.Repository --startup-project CineWebApi
```

Revisá la conexión antes de ejecutar migraciones; no guardes contraseñas en el repositorio. La API usa <http://localhost:5271/api>, configurada en [`environment.ts`](src/environments/environment.ts). La política CORS del backend permite el frontend en `http://localhost:4200`.

## 2. Buenas prácticas

- Usá tipos concretos, como [`Movie`](src/app/features/movies/models/movie.ts), en lugar de `any`.
- Separá las responsabilidades: [`MovieService`](src/app/features/movies/services/movie-service.ts) obtiene datos y [`MovieCatalog`](src/app/features/movies/components/movie-catalog/movie-catalog.ts) los presenta.
- Agrupá los archivos relacionados y separá plantillas largas: el catálogo está en [`src/app/features/movies/components/movie-catalog/`](src/app/features/movies/components/movie-catalog/).
- El proyecto conserva los nombres generados con su CLI actual, como `movie-list.ts`; la clase también muestra la convención `movie-list.component.ts`. Lo importante es ser consistente.

### Estructura de carpetas

Siguiendo el [ejemplo de la clase](https://material-trail-def.notion.site/Estructura-de-carpetas-eb150be2bb9a8310b38a81b77f9bbeba), el código se organiza así:

```text
src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── shared/
├── features/
│   ├── actors/
│   │   ├── components/actor-list/
│   │   ├── models/
│   │   └── services/
│   └── movies/
│       ├── components/
│       │   ├── movie-catalog/
│       │   ├── movie-collapse/
│       │   ├── movie-detail/
│       │   └── movie-list/
│       ├── models/
│       └── services/
├── layouts/
│   └── main-layout/
│       ├── main-layout.css
│       ├── main-layout.html
│       └── main-layout.ts
├── app.config.ts
├── app.html
├── app.routes.ts
└── app.ts
```

`core` reúne la guarda, el interceptor y los servicios compartidos de sesión y token; cada funcionalidad agrupa sus propios componentes, modelos y servicios. El layout principal contiene el encabezado, la navegación y el espacio para mostrar cada página. [`shared`](src/app/shared/) queda preparada para componentes de UI reutilizables; por ahora no contiene componentes.

## 3. Conectar con el backend: HttpClient y observables

En **Catálogo**, presioná **Consultar películas**. El componente se suscribe al observable devuelto por `getAllFromApi()`; esa suscripción inicia la petición:

```typescript
getAllFromApi(): Observable<Movie[]> {
  return this.http.get<Movie[]>(this.url);
}
```

Revisá [`movie-service.ts`](src/app/features/movies/services/movie-service.ts), [`movie-catalog.ts`](src/app/features/movies/components/movie-catalog/movie-catalog.ts) y [`app.config.ts`](src/app/app.config.ts), donde se configura `provideHttpClient`. El componente muestra la carga, los resultados y los errores; `takeUntilDestroyed` cancela la suscripción si salís de la pantalla.

`getAll()` sigue devolviendo datos locales mediante `of(...)`. `getAllFromApi()` hace un `GET /api/movies` real; no usa los datos locales como alternativa si la API falla. El tipo `Movie[]` describe la respuesta esperada, pero no valida el JSON automáticamente: el componente comprueba su estructura antes de mostrarlo.

Un ejemplo pequeño de operadores de RxJS:

```typescript
import { map, of } from 'rxjs';

of(1, 2, 3)
  .pipe(map((numero) => numero * 2))
  .subscribe((numero) => console.log(numero)); // 2, 4, 6
```

**Para probar:** con la API apagada debe aparecer un error de conexión. Con la API y la base funcionando debe aparecer el número de películas, incluso si es cero. Un error 500 requiere revisar la API y su conexión a la base.

## 4. Navegación

Las rutas están en [`app.routes.ts`](src/app/app.routes.ts), y `<router-outlet>` en [`main-layout.html`](src/app/layouts/main-layout/main-layout.html) muestra el componente de la ruta actual sin recargar la página completa. El componente raíz incluye ese layout desde [`app.html`](src/app/app.html).

- `/movies`: listado.
- `/movies/1`: detalle; [`MovieDetail`](src/app/features/movies/components/movie-detail/movie-detail.ts) lee el `id` con `ActivatedRoute`.
- `/actors?movieId=1&title=Inception`: filtro por parámetros de consulta; [`ActorList`](src/app/features/actors/components/actor-list/actor-list.ts) los lee y filtra.
- `/catalog`: catálogo que permite consultar películas en la API.
- `/catalog/actors`: reutiliza la lista de actores de ejemplo, pero pasa antes por una guarda.

En [`movie-list.html`](src/app/features/movies/components/movie-list/movie-list.html), `routerLink` construye la ruta al detalle:

```html
<a [routerLink]="['/movies', movie.id]">{{ movie.title }}</a>
```

Angular prueba las rutas en orden. Si agregás una ruta comodín `**` para una página 404 o una redirección, colocala al final; este proyecto aún no la configura.

## 5. Guardas y sesión simulada

1. En **Catálogo**, intentá abrir **Ver actores con acceso simulado** con la sesión cerrada: volvés al catálogo y aparece **Acceso denegado**.
2. Ingresá `demo` como usuario y `demo` como contraseña, presioná **Simular inicio de sesión** y abrí el enlace otra vez: ahora se muestra la lista. Son valores públicos de ejemplo: no ingreses credenciales reales.
3. Volvé a **Catálogo**, cerrá la sesión simulada e intentá entrar nuevamente.

El formulario de [`movie-catalog.html`](src/app/features/movies/components/movie-catalog/movie-catalog.html) utiliza `ngModel` y `ngSubmit` mediante `FormsModule`. [`demo-session.ts`](src/app/core/services/demo-session.ts) comprueba únicamente esos valores públicos y mantiene el estado en memoria; al recargar la página se pierde. [`demo-session.guard.ts`](src/app/core/guards/demo-session.guard.ts) devuelve `true` para permitir la navegación o un `UrlTree` para redirigir:

```typescript
export const demoSessionGuard: CanActivateFn = () => {
  if (inject(DemoSession).signedIn()) {
    return true;
  }

  return inject(Router).createUrlTree(['/catalog'], {
    queryParams: { acceso: 'denegado' },
  });
};
```

La ruta normal `/actors` sigue siendo pública. `CanActivate` controla la entrada; `CanDeactivate` puede confirmar la salida de un formulario; un resolver carga datos antes de activar la ruta.

**Importante:** esto no es autenticación real y no se emite ningún token. Una guarda controla la navegación, pero no protege datos ni operaciones; el backend debe autenticar y verificar permisos. `localStorage` conserva datos entre sesiones y `sessionStorage` dura hasta cerrar la pestaña, pero ambos son accesibles desde JavaScript. Para una sesión real, evaluá con el backend el almacenamiento seguro, incluyendo riesgos de XSS y CSRF.

## 6. Interceptor de autorización

Un interceptor recibe las peticiones realizadas con `HttpClient` antes de enviarlas. En [`auth-interceptor.ts`](src/app/core/interceptors/auth-interceptor.ts), `authInterceptor` consulta [`ApiTokenService`](src/app/core/services/api-token-service.ts) y, si hay un token, clona la petición inmutable para agregar `Authorization`. Después la entrega a `next()`, sin modificar la respuesta ni ocultar errores:

```typescript
return next(isApiRequest ? request.clone({ setHeaders: { Authorization: token } }) : request);
```

Para que Angular lo use, se registra en [`app.config.ts`](src/app/app.config.ts):

```typescript
provideHttpClient(withFetch(), withInterceptors([authInterceptor]));
```

Esto afecta las llamadas reales con `HttpClient`; los datos de ejemplo devueltos mediante `of(...)` no pasan por el interceptor.

El token se agrega solo a la URL de la API configurada en `environment.ts` y sus rutas, nunca a otras direcciones. Si la petición ya tiene una cabecera `Authorization`, se respeta. El filtro del backend compara el valor completo de esa cabecera; para los tokens actuales no antepongas `Bearer`. Como la API está en otro origen, el navegador puede enviar una petición CORS previa; la configuración actual del backend permite la cabecera `Authorization`.

Para verlo en acción:

1. Iniciá el frontend y el backend como se explicó arriba.
2. En **Catálogo**, ingresá un token de prueba en **Token de la API** y presioná **Guardar token**. El campo se limpia y el token queda solo en memoria.
3. Abrí las herramientas de desarrollador del navegador, pestaña **Red / Network**, y presioná **Consultar películas**. En la solicitud a `/api/movies`, revisá la cabecera `Authorization`.
4. Presioná **Quitar token** y repetí la consulta: la cabecera ya no aparece.

La sesión simulada de actores es independiente y no genera ni elimina el token de la API. Al recargar la página, el token en memoria se pierde. `GET /api/movies` es público, por lo que recibir un 200 no demuestra que el token sea válido; el backend comprueba la autorización en las operaciones protegidas. Usá tokens de prueba, no los guardes en el repositorio ni los compartas en capturas, y usá HTTPS para credenciales reales.
