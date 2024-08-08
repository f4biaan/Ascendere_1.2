import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _firestore: AngularFirestore) {}

  /**
   * Funtion to get all courses
   * @returns Observable<Course[]>
   */
  getCourses(): Observable<any[]> {
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
  /* getCourseById(id: string): Observable<any> {
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
  } */
}
