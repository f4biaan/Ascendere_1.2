import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/interfaces/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CourseListComponent implements OnInit {
  // private _coursesService = inject(CoursesService);

  public courses: Course[] = [];

  ngOnInit(): void {
    this._coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      // console.log(courses);
    });
  }

  constructor(
    private router: Router,
    private _coursesService: CoursesService
  ) {}

  enterCourse(courseId: string) {
    this.router.navigate([`/${courseId}`]);
  }
}
