import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { InduccionUnidadesComponent } from './features/user/pages/course/induccion-unidades/induccion-unidades.component';
import { IAComponent } from './features/user/pages/course/ia/ia.component';
import { IaUnidadesComponent } from './features/user/pages/course/ia-unidades/ia-unidades.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { InduccionComponent } from './features/user/pages/course/induccion/induccion.component';
import { CourseListComponent } from './features/user/pages/course-list/course-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'courselist', component: CourseListComponent },
  { path: 'induccion', component: InduccionComponent },
  { path: 'induccion/unidades', component: InduccionUnidadesComponent },
  { path: 'ia', component: IAComponent },
  { path: 'ia/unidades', component: IaUnidadesComponent },
  { path: 'login', component: LoginComponent },
];
