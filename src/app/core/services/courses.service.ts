import { computed, Injectable, Signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course, CourseCard } from '../interfaces/course';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  #courses: Signal<Course[] | undefined> = toSignal(this.getCourses());

  public dataCoursesCards: Signal<CourseCard[]> = computed(() => {
    const courses = this.#courses();
    if (!courses) {
      return [];
    }
    // return only title and id
    return courses.map((course) => {
      return {
        id: course.id,
        title: course.title,
        // TODO: when presents on card html, limit caracters presented to 100 example and '...'
        introduction: course.introduction,
      };
    });
  });

  constructor(private _firestore: AngularFirestore) {}

  /**
   * Funtion to get all courses
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
   * Funtion to get a course by id
   * @param id identifier of the course
   * @returns Observable<Course>
   */
  getCourseById(id: string): Observable<any> {
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
