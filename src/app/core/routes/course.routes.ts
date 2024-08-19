import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  { path: '', redirectTo: '/courselist', pathMatch: 'full' },
  {
    path: `:idCourse`,
    loadComponent: () =>
      import('../../features/user/pages/course/layout/layout.component'),
    children: [
      {
        path: 'unit',
        loadComponent: () =>
          import(
            '../../features/user/pages/course/course-units/course-units.component'
          ),
      },

      // TODO: Add url for tests
    ],
    /* loadComponent: () =>
      import(
        '../../features/user/pages/course/course-start/course-start.component'
      ), */
  },
];
