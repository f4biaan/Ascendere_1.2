import { Component, inject, OnInit } from '@angular/core';
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
export default class CourseListComponent {
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
