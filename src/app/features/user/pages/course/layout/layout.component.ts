import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import CourseUnitsComponent from '../course-units/course-units.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export default class LayoutComponent {
  public idCourse: Signal<string> = toSignal(
    this.route.params.pipe(map((params) => params['idCourse']))
  );

  constructor(private route: ActivatedRoute) {}

  // Método que se ejecuta cuando se activa un componente hijo
  onActivate(component: any) {
    if (component instanceof CourseUnitsComponent) {
      component.idCourse = this.idCourse(); // Pasa el valor al componente hijo
    }
  }
}
