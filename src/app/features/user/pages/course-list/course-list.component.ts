import { Component, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/interfaces/course';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user';
import { DailyGoalService } from '../../../../core/services/daily-goal.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: true,
  imports: [CommonModule, SidebarComponent],
})
export default class CourseListComponent implements OnInit {
  user!: User | null;
  showMetaDialog: boolean = false; // Mostrar el cuadro de diálogo al iniciar
  metaDiaria: number | null = null; // Meta diaria seleccionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _coursesService: CoursesService,
    private _authService: AuthService,
    private _dailyGoalService: DailyGoalService
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
    const storedMeta = localStorage.getItem('metaDiaria');
    this._dailyGoalService.getDailyGoal().subscribe((goal) => {
      if (goal) {
        // this.metaDiaria = parseInt(storedMeta, 10);
        this.metaDiaria = goal;
        if (storedMeta != goal.toString()) {
          localStorage.setItem('metaDiaria', goal.toString());
        }
        this.showMetaDialog = false; // Si ya tiene meta, no mostrar el diálogo
      } else {
        this.showMetaDialog = true; // Si no tiene meta, mostrar el diálogo
      }
    });

    this._authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  setMetaDiaria(minutos: number): void {
    this.metaDiaria = minutos;
    localStorage.setItem('metaDiaria', minutos.toString()); // Guardar la meta en el almacenamiento local
    this._dailyGoalService.saveDailyGoal(minutos).then(
      () => {
        console.log('Meta diaria guardada');
      },
      (error) => {
        console.error('Error al guardar la meta diaria', error);
      }
    ); // Guardar la meta en la base de datos
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
