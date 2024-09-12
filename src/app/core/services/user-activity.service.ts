import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserActivityService {
  constructor(
    private _firestore: AngularFirestore,
    private _authService: AuthService
  ) {
    console.log('UserActivityService initialized');
    this.trackUserEntry();
  }

  // Registrar el inicio de la interacción cuando la autenticación se completa
  private trackUserEntry() {
    this._authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user) => {
        const userid = user?.id;

        if (userid) {
          const currentEntryDate = this.generateSessionId();
          console.log('User entry registered', currentEntryDate, userid);
          console.log(user);

          const lastEntryIsToday = user?.lastEntry === currentEntryDate;
          const checkLastEntry = lastEntryIsToday ? 'Today' : 'Not today';

          if (!!user.lastEntry || !lastEntryIsToday) {
            this._firestore
              .collection('users')
              .doc(userid)
              .collection('entries')
              .doc(currentEntryDate)
              .set({
                entry: 'load',
                timestamp: currentEntryDate,
                dailyGoal: user?.dailyGoal,
                hasReachedDailyGoal: false,
              })
              .then(() => {
                // console.log('User entry stored in Firestore', currentEntryDate);
              })
              .catch((error) => {
                console.error('Error storing user entry:', error);
              });

            // Update last entry on user document
            this.saveLastEntry(userid, currentEntryDate);
            // save last entry on local storage
            localStorage.setItem('lastEntry', currentEntryDate.toString());
          } else {
            return;
          }
        }
      });
  }

  private getLastEntry(userid: string) {
    return this._firestore.collection('users').doc(userid).snapshotChanges();
  }

  private saveLastEntry(userid: string, lastEntry: string) {
    return this._firestore.collection('users').doc(userid).update({
      lastEntry,
    });
  }

  private generateSessionId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // const hours = String(now.getHours()).padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // const seconds = String(now.getSeconds()).padStart(2, '0');

    // return `${year}${month}${day}-${hours}${minutes}${seconds}`;
    return `${year}_${month}_${day}`;
  }
}
