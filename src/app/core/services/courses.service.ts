import { computed, Injectable, Signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, BehaviorSubject } from 'rxjs';
import {
  Course,
  CourseCard,
  CourseStartPage,
  CourseUnitTab,
  Unit,
} from '../interfaces/course';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidebarService } from './sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from './teachers.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  #courses: Signal<Course[] | undefined> = toSignal(this.getCourses());
  #currentCourseSubject: BehaviorSubject<Course | undefined> =
    new BehaviorSubject<Course | undefined>(undefined);
  #currentCourse: Signal<Course | undefined> = toSignal(
    this.#currentCourseSubject.asObservable()
  );
  #currentCourseTab: Signal<string> = toSignal(
    this.route.queryParams.pipe(map((params) => params['tab']))
  );

  setCurrentCourse(courseId: string) {
    this.getCourseById(courseId).subscribe((course) => {
      this.#currentCourseSubject.next(course);

      this._teachersService.setTeachersIds(course.authorTeacher);
    });
  }

  public dataCoursesCards: Signal<CourseCard[]> = computed(() => {
    const courses = this.#courses();
    const filter = this._sidebarService.filter();

    if (!courses) {
      return [];
    }

    // TODO: when presents on card html, limit caracters presented to 100 example and '...'
    return filter === 'all'
      ? courses.map((course) => {
          return {
            id: course.id,
            title: course.title,
            introduction: course.introduction,
            typeCourse: course.typeCourse,
          };
        })
      : courses
          .filter((course) => course.typeCourse === filter)
          .map((course) => {
            return {
              id: course.id,
              title: course.title,
              introduction: course.introduction,
              typeCourse: course.typeCourse,
            };
          });
  });

  public unitsTabs: Signal<CourseUnitTab[] | undefined> = computed(() => {
    const course = this.#currentCourse();
    return course?.units.map((unit) => {
      return {
        id: unit.id,
        headerName: unit.headerName,
      };
    });
  });

  public inicioCoursePage: Signal<CourseStartPage> = computed(() => {
    const course = this.#currentCourse();
    const teachers = this._teachersService.teachersData();

    return {
      title: course?.title,
      teachers: teachers,
      idCourse: course?.id,
      assessmentCriteria: course?.assessmentCriteria,
      authorTeacher: course?.authorTeacher,
      introduction: course?.introduction,
      learningOutcomes: course?.learningOutcomes,
      methodology: course?.methodology,
      welcomeVideo: course?.welcomeVideo,
    } as CourseStartPage;
  });

  public currentUnit: Signal<Unit | undefined> = computed(() => {
    const course = this.#currentCourse();
    const tab = this.#currentCourseTab();
    return course?.units.find((unit) => unit.id === tab);
  });

  constructor(
    private route: ActivatedRoute,
    private _firestore: AngularFirestore,
    private _sidebarService: SidebarService,
    private _teachersService: TeachersService
  ) {
    // const course = this.#currentCourse();
    // this._teachersService.setTeachersIds(course?.authorTeacher!);
  }

  /**
   * @function to get all courses
   * @returns Observable<Course[]>
   */
  getCourses(): Observable<Course[]> {
    return this._firestore
      .collection('courses')
      .snapshotChanges()
      .pipe(
        map((courses: any[]) =>
          courses.map((course) => {
            const data = course.payload.doc.data();
            const id = course.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }

  /**
   * @funtion to get a course by id
   * @param id identifier of the course
   * @returns Observable<Course>
   */
  getCourseById(id: string): Observable<Course> {
    return this._firestore
      .collection('courses')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((course: any) => {
          const data = course.payload.data();
          const id = course.payload.id;
          return { ...data, id };
        })
      );
  }
}
