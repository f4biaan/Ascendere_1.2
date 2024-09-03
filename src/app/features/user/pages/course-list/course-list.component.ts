import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/interfaces/course';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: true,
  imports: [CommonModule, SidebarComponent],
})
export default class CourseListComponent implements OnInit {
  user!: User | null;
  showMetaDialog: boolean = true; // Mostrar el cuadro de diálogo al iniciar
  metaDiaria: number | null = null; // Meta diaria seleccionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _coursesService: CoursesService,
    private _authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      const filter = params['filter'];
      if (!filter) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { filter: 'all' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  ngOnInit(): void {
    // Podrías cargar la meta diaria desde almacenamiento local si ya está guardada
    const storedMeta = localStorage.getItem('metaDiaria');
    if (storedMeta) {
      this.metaDiaria = parseInt(storedMeta, 10);
      this.showMetaDialog = false; // Si ya tiene meta, no mostrar el diálogo
    }

    this._authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  setMetaDiaria(minutos: number): void {
    this.metaDiaria = minutos;
    localStorage.setItem('metaDiaria', minutos.toString()); // Guardar la meta en el almacenamiento local
    this.showMetaDialog = false; // Ocultar el cuadro de diálogo
  }

  enterCourse(courseId: string) {
    this._coursesService
      .registerOrEnterOnCourse(courseId, this.user)
      .then(() => {
        this.router.navigate([`course/${courseId}/unit`]);
      });
  }

  saveMetaDiaria() {}

  encodeId(id: string) {
    return btoa(id);
  }

  decodeId(id: string) {
    return atob(id);
  }
}
