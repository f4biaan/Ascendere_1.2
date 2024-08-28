import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/interfaces/course';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: true,
  imports: [CommonModule, SidebarComponent],
})
export default class CourseListComponent implements OnInit {
  showMetaDialog: boolean = true; // Mostrar el cuadro de diálogo al iniciar
  metaDiaria: number | null = null; // Meta diaria seleccionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _coursesService: CoursesService
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
  }

  setMetaDiaria(minutos: number): void {
    this.metaDiaria = minutos;
    localStorage.setItem('metaDiaria', minutos.toString()); // Guardar la meta en el almacenamiento local
    this.showMetaDialog = false; // Ocultar el cuadro de diálogo
  }

  enterCourse(courseId: string) {
    this.router.navigate([`course/${courseId}/unit`]);
  }

  encodeId(id: string) {
    return btoa(id);
  }

  decodeId(id: string) {
    return atob(id);
  }
}
