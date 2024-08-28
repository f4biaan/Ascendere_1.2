import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject({} as User);
  private _userHome$: Subject<User> = new Subject();

  constructor(private firestore: AngularFirestore, private router: Router) {}

  setUser(user: User) {
    this._user$.next(user);
    this._userHome$.next(user);
  }

  get user$() {
    return this._user$.asObservable();
  }

  get userHome$() {
    return this._userHome$.asObservable();
  }

  getAllStudent() {
    return this.firestore
      .collection('users', (ref) => ref.where('role', '==', 'estudiante'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
  }

  getUserById(id: string) {
    return this.firestore
      .collection('users')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as User;
          data.id = a.payload.id;
          return data;
        })
      );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.firestore
      .collection('users', (ref) => ref.where('mail', '==', email))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const a = actions[0]; // Get the first action
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        })
      );
  }

  getCurrentUser() {
    return this._user$.getValue();
  }
}
