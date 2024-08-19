import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressComponent } from '../../../components/progress/progress.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CoursesService } from '../../../../../core/services/courses.service';
import { CourseStartPage } from '../../../../../core/interfaces/course';
import { UnitsComponent } from '../../../components/units/units.component';

@Component({
  selector: 'app-course-start',
  templateUrl: './course-units.component.html',
  styleUrls: ['./course-units.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressComponent, UnitsComponent],
})
export default class CourseUnitsComponent implements OnInit {
  @Input() idCourse!: string;
  activeTab: string = 'resultados'; // Inicializar con una pestaña de contenido

  // Code and decode id of course

  courseTab: Signal<string> = toSignal(
    this.route.queryParams.pipe(map((params) => params['tab']))
  );
  courseInicioPage: Signal<CourseStartPage> =
    this._coursesService.inicioCoursePage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _coursesService: CoursesService,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {
      const tabUnit = params['tab'];
      // console.log(tabUnit);
      if (!tabUnit) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { tab: 'inicio' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.idCourse) {
      this._coursesService.setCurrentCourse(this.idCourse);
    } else {
      console.error('idCourse no está definido');
    }
  }

  setActiveTab(tab: string) {
    setTimeout(() => {
      this.activeTab = tab;
    }, 100);
  }

  navigateTo(tabCourse: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabCourse },
      queryParamsHandling: 'merge',
    });
    setTimeout(() => {
      this.cdRef.detectChanges(); // Forzar la detección de cambios después de un pequeño retraso
    }, 100);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
