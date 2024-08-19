import { computed, Injectable, Signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Teacher } from '../interfaces/teachers';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  #teachersCoursesSubject = new BehaviorSubject<Teacher[] | undefined>(
    undefined
  );
  #teachersCourses: Signal<Teacher[] | undefined> = toSignal(this.#teachersCoursesSubject.asObservable());
  // #teachersCourses: Signal<Teacher[] | undefined> = toSignal(this.getTeachers());

  setTeachersIds(ids: string[]) {
    this.getArrayTeachers(ids).subscribe((teachers) =>
      this.#teachersCoursesSubject.next(teachers)
    );
  }

  public teachersData: Signal<Teacher[] | undefined> = computed(() => {
    return this.#teachersCourses();
  });

  constructor(private _firestore: AngularFirestore) {}

  getArrayTeachers(ids: string[]): Observable<Teacher[]> {
    // use getTeacherById
    let teachers: Teacher[] = [];
    ids.forEach((id) => {
      this.getTeacherById(id).subscribe((teacher) => {
        teachers.push(teacher);
      });
    });
    return of(teachers);
  }
  getTeacherById(id: string): Observable<Teacher> {
    return this._firestore
      .collection('teachers')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((doc: any) => {
          const data = doc.payload.data();
          const id = doc.payload.id;
          return { ...data, id };
        })
      );
  }
}
