import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/courselist', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/user/pages/login/login.component'),
  },
  {
    path: 'courselist',
    loadComponent: () =>
      import('./features/user/pages/course-list/course-list.component'),
  },
  // TODO: add a route file for the user route in a course
  {
    path: 'induccion',
    loadComponent: () =>
      import('./features/user/pages/course/induccion/induccion.component'),
  },
  {
    path: 'induccion/unidades',
    loadComponent: () =>
      import(
        './features/user/pages/course/induccion-unidades/induccion-unidades.component'
      ),
  },
  {
    path: 'ia',
    loadComponent: () => import('./features/user/pages/course/ia/ia.component'),
  },
  {
    path: 'ia/unidades',
    loadComponent: () =>
      import('./features/user/pages/course/ia-unidades/ia-unidades.component'),
  },
];
