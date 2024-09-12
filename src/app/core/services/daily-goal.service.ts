import { computed, inject, Injectable, Signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyGoalService {
  private _authService = inject(AuthService);

  #user: Signal<User | undefined | null> = toSignal(
    this._authService.getCurrentUser()
  );

  constructor(private _firestore: AngularFirestore) {}

  public saveDailyGoal(goal: number) {
    // console.log('setDailyGoal');
    // console.log(goal, this.#user()!.id);
    return this._firestore.collection('users').doc(this.#user()!.id).update({
      dailyGoal: goal,
    });
  }

  public getCurrentEntry(
    userId: string,
    todayCodeEntry: string
  ): Observable<any> {
    return this._firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(todayCodeEntry)
      .valueChanges();
  }

  public getDailyGoal(): Observable<number | undefined> {
    return this._authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user) {
          return of(undefined);
        }
        return this._firestore
          .collection('users')
          .doc(user.id)
          .snapshotChanges()
          .pipe(
            map((doc) => {
              const data = doc.payload.data() as User | undefined;
              return data?.dailyGoal;
            })
          );
      })
    );
  }

  updateDailyGoalState(
    userId: string,
    hasReachedGoal: boolean,
    todayCodeEntry: string
  ): Promise<void> {
    /* const now = new Date();
    const todayCodeEntry = `${now.getFullYear()}_${String(
      now.getMonth() + 1
    ).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
 */
    return this._firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(todayCodeEntry)
      .update({
        hasReachedDailyGoal: hasReachedGoal,
      });
  }

  updateUserProgress(userId: string, tiempoActivo: number): Promise<void> {
    const now = new Date();
    const todayCodeEntry = `${now.getFullYear()}_${String(
      now.getMonth() + 1
    ).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;

    return this._firestore
      .collection('users') // Colección en Firestore
      .doc(userId) // Documento del usuario
      .collection('entries') // Subcolección de entradas
      .doc(todayCodeEntry) // Documento de la entrada actual
      .update({
        activeTime: tiempoActivo,
      });
  }
}
